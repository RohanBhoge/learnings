"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import { FiEdit2, FiUploadCloud, FiEye, FiEyeOff } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
import shared from "./shared/FormShared.module.css";
import styles from "./SalaryBank.module.css";
import { capitalizeWords } from "../utils/Validators.js";
import { saveDraftAPI } from "../utils/api";
import { saveDraftToLocalStorage } from "../utils/storage";
import { mapEmployeeSalaryBankToApiData } from "../utils/MapDetails";
import { saveEmployeeDraft } from "../api/Employeeapi";

const fmt = (n) => `₹${Number(n || 0).toLocaleString("en-IN")}`;

const DEFAULT_EARNINGS = [
  {
    key: "basicSalary",
    label: "Basic Salary*",
    value: 0,
    autoMode: false,
    percent: 0,
    isBase: true,
  },
  {
    key: "da",
    label: "Dearness Allowance (DA)",
    value: 0,
    autoMode: false,
    percent: 20,
  },
  {
    key: "hra",
    label: "House Rent Allowance (HRA)",
    value: 0,
    autoMode: false,
    percent: 0,
  },
  {
    key: "transport",
    label: "Transport Allowance",
    value: 0,
    autoMode: false,
    percent: 0,
  },
  {
    key: "medical",
    label: "Medical Allowance",
    value: 0,
    autoMode: false,
    percent: 0,
  },
  {
    key: "special",
    label: "Special Allowance",
    value: 0,
    autoMode: false,
    percent: 0,
  },
  {
    key: "research",
    label: "Research Allowance",
    value: 0,
    autoMode: false,
    percent: 0,
  },
  {
    key: "phoneInternet",
    label: "Phone / Internet Allowance",
    value: 0,
    autoMode: false,
    percent: 0,
  },
];

const DEFAULT_DEDUCTIONS = [
  {
    key: "pf",
    label: "Provident Fund (PF 12%)",
    value: 0,
    autoMode: true,
    percent: 12,
    fixed: true,
  },
  {
    key: "professionalTax",
    label: "Professional Tax",
    value: 0,
    autoMode: false,
    percent: 0,
  },
  {
    key: "tds",
    label: "TDS (Income Tax)",
    value: 0,
    autoMode: false,
    percent: 0,
  },
  { key: "esi", label: "ESI", value: 0, autoMode: false, percent: 0 },
  {
    key: "loanRecovery",
    label: "Loan Recovery",
    value: 0,
    autoMode: false,
    percent: 0,
  },
];

const ACCOUNT_TYPES = ["Savings Account", "Current Account", "Salary Account"];
const PAYMENT_MODES = ["Bank Transfer", "Cheque", "Cash"];
const PAYMENT_CYCLES = ["Monthly", "Bi-monthly", "Weekly"];

// ─────────────────────────────────────────────────────────────────────────────

const SalaryBank = ({
  formData = {},
  setFormData,
  onNext,
  onPrev,
  draftId,
  setDraftId,
}) => {
  const [earnings, setEarnings] = useState(
    formData.earnings || DEFAULT_EARNINGS,
  );
  const [deductions, setDeductions] = useState(
    formData.deductions || DEFAULT_DEDUCTIONS,
  );
  const [editingRow, setEditingRow] = useState(null); // key of row in label-edit mode
  const [showAccNum, setShowAccNum] = useState(false);
  const [showConfirmAcc, setShowConfirmAcc] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const chequeRef = useRef(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  // ── Recalculate PF whenever basic changes ────────────────────────────────
  // useEffect(() => {
  //   const basic = earnings.find((e) => e.key === "basicSalary")?.value || 0;
  //   setDeductions((prev) =>
  //     prev.map((d) =>
  //       d.key === "pf" ? { ...d, value: Math.round((basic * 12) / 100) } : d,
  //     ),
  //   );
  // }, [earnings.find((e) => e.key === "basicSalary")?.value]);

  // ── Sync to formData whenever earnings/deductions change ─────────────────
  // useEffect(() => {
  //   setFormData((prev) => ({ ...prev, earnings, deductions }));
  // }, [earnings, deductions]);

  const basicSalary = earnings.find((e) => e.key === "basicSalary")?.value || 0;

  const grossSalary = earnings.reduce((s, e) => s + Number(e.value || 0), 0);
  const totalDeductions = deductions.reduce(
    (s, d) => s + Number(d.value || 0),
    0,
  );
  const netSalary = grossSalary - totalDeductions;
  const ctcAnnual = grossSalary * 12;

  useEffect(() => {
    const pfValue = Math.round((basicSalary * 12) / 100);
    setDeductions((prev) => {
      const current = prev.find((d) => d.key === "pf");
      if (!current || current.value === pfValue) return prev;
      return prev.map((d) => (d.key === "pf" ? { ...d, value: pfValue } : d));
    });
  }, [basicSalary]);

  // ── Earnings helpers ─────────────────────────────────────────────────────
  const updateEarning = (key, field, e) => {
    const { value } = e.target;
    setEarnings((prev) =>
      prev.map((e) => {
        if (e.key !== key) return e;
        const updated = {
          ...e,
          [field]: field === "label" ? value : Number(value || 0),
        };

        if (field === "percent" && updated.autoMode && !updated.isBase) {
          updated.value = Math.round((basicSalary * Number(value || 0)) / 100);
        }
        return updated;
      }),
    );
  };

  const toggleEarningMode = (key) => {
    setEarnings((prev) =>
      prev.map((e) => {
        if (e.key !== key) return e;
        const newMode = !e.autoMode;
        const updated = { ...e, autoMode: newMode };
        if (newMode) {
          updated.value = Math.round(
            (basicSalary * Number(e.percent || 0)) / 100,
          );
        }
        return updated;
      }),
    );
  };

  // ── Deduction helpers ────────────────────────────────────────────────────
  const updateDeduction = (key, field, val) => {
    setDeductions((prev) =>
      prev.map((d) => {
        if (d.key !== key) return d;
        const updated = { ...d, [field]: val };
        if (field === "percent" && updated.autoMode && key !== "pf") {
          updated.value = Math.round((basicSalary * Number(val || 0)) / 100);
        }
        return updated;
      }),
    );
  };

  const toggleDeductionMode = (key) => {
    if (key === "pf") return; // PF is always auto
    setDeductions((prev) =>
      prev.map((d) => {
        if (d.key !== key) return d;
        const newMode = !d.autoMode;
        const updated = { ...d, autoMode: newMode };
        if (newMode) {
          updated.value = Math.round(
            (basicSalary * Number(d.percent || 0)) / 100,
          );
        }
        return updated;
      }),
    );
  };

  const addAllowance = () => {
    const key = `custom_${Date.now()}`;
    setEarnings((prev) => [
      ...prev,
      { key, label: "New Allowance", value: 0, autoMode: false, percent: 0 },
    ]);
    setEditingRow(key);
  };

  const addDeduction = () => {
    const key = `customDed_${Date.now()}`;
    setDeductions((prev) => [
      ...prev,
      { key, label: "New Deduction", value: 0, autoMode: false, percent: 0 },
    ]);
    setEditingRow(key);
  };

  // ── Bank change ──────────────────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    let v = value;
    if (["bankName", "branchName"].includes(name)) v = capitalizeWords(value);
    if (name === "accountNumber" || name === "confirmAccountNumber")
      v = value.replace(/\D/g, "");
    if (name === "ifscCode")
      v = value.replace(/[^A-Za-z0-9]/g, "").toUpperCase();
    setFormData((prev) => ({ ...prev, [name]: v }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    let msg = "";
    if (name === "bankName" && !value?.trim()) msg = "Bank name is required";
    if (name === "branchName" && !value?.trim())
      msg = "Branch name is required";
    if (name === "accountNumber" && !value?.trim())
      msg = "Account number is required";
    if (name === "confirmAccountNumber") {
      if (!value?.trim()) msg = "Please confirm account number";
      else if (value !== formData.accountNumber)
        msg = "Account numbers do not match";
    }
    if (name === "ifscCode" && !value?.trim()) msg = "IFSC code is required";
    if (name === "accountType" && !value) msg = "Account type is required";
    if (name === "paymentCycle" && !value) msg = "Payment cycle is required";
    setErrors((prev) => ({ ...prev, [name]: msg }));
  };

  const getInputClass = (name) =>
    touched[name] && errors[name] ? shared.errorInput : "";

  // ── Cheque upload ─────────────────────────────────────────────────────────
  const handleChequeUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, cheque: "Max 5MB allowed" }));
      return;
    }
    setFormData((prev) => ({
      ...prev,
      chequeCopy: file,
      chequeName: file.name,
    }));
  };

  // ── Validate ─────────────────────────────────────────────────────────────
  const validate = () => {
    const checks = [
      ["bankName", formData.bankName],
      ["branchName", formData.branchName],
      ["accountNumber", formData.accountNumber],
      ["confirmAccountNumber", formData.confirmAccountNumber],
      ["ifscCode", formData.ifscCode],
      ["accountType", formData.accountType],
      ["paymentCycle", formData.paymentCycle],
    ];
    const newErrors = {};
    const newTouched = {};
    checks.forEach(([name, value]) => {
      const el = { name, value: value || "" };
      // re-use handleBlur logic inline
      let msg = "";
      if (name === "bankName" && !value?.trim()) msg = "Bank name is required";
      if (name === "branchName" && !value?.trim())
        msg = "Branch name is required";
      if (name === "accountNumber" && !value?.trim())
        msg = "Account number is required";
      if (name === "confirmAccountNumber") {
        if (!value?.trim()) msg = "Please confirm account number";
        else if (value !== formData.accountNumber)
          msg = "Account numbers do not match";
      }
      if (name === "ifscCode" && !value?.trim()) msg = "IFSC code is required";
      if (name === "accountType" && !value) msg = "Account type is required";
      if (name === "paymentCycle" && !value) msg = "Payment cycle is required";
      if (msg) {
        newErrors[name] = msg;
        newTouched[name] = true;
      }
    });
    setErrors(newErrors);
    setTouched((prev) => ({ ...prev, ...newTouched }));
    return Object.keys(newErrors).length === 0;
  };

  // const handleNext = () => {
  //   if (validate()) {
  //     saveDraftToLocalStorage(formData);
  //     onNext();
  //   } else {
  //     setTimeout(() => {
  //       const el = document.querySelector(`.${shared.errorText}`);
  //       if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  //     }, 100);
  //   }
  // };

  const handlePrev = () => {
    saveDraftToLocalStorage(formData);
    onPrev();
  };

  // const handleSaveDraft = async () => {
  //   saveDraftToLocalStorage(formData);
  //   await saveDraftAPI(formData);
  // };

  const handleNext = async () => {
    if (!validate()) {
      setTimeout(() => {
        const firstError = document.querySelector(`.${styles.errorText}`);
        if (firstError)
          firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
      return;
    }

    setSaveError("");
    setSaving(true);
    try {
      const apiData = await mapEmployeeSalaryBankToApiData(formData);
      const res = await saveEmployeeDraft(draftId, "salaryBank", apiData);
      if (!draftId && res?.data?.id) setDraftId(res.data.id);
      onNext();
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } catch (err) {
      console.error("Draft save failed:", err.message);
      setSaveError(err.message);
      toast.error(err.message || "Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveDraft = async () => {
    setSaveError("");
    setSaving(true);
    try {
      const apiData = await mapEmployeeSalaryBankToApiData(formData);
      const res = await saveEmployeeDraft(draftId, "salaryBank", apiData);
      if (!draftId && res?.data?.id) setDraftId(res.data.id);
    } catch (err) {
      console.error("Draft save failed:", err.message);
      setSaveError(err.message);
      toast.error(err.message || "Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // ── SalaryRow sub-component ──────────────────────────────────────────────
  const PAYMENT_CYCLES = ["Monthly", "Bi-monthly", "Weekly"];

  // ── SalaryRow sub-component (MUST stay outside SalaryBank) ──────────────────
  // Defining this inside the parent creates a new component type on every
  // render, which remounts the input and kills focus while typing.
  const SalaryRowItem = ({
    item,
    onChange,
    onToggleMode,
    editingRow,
    setEditingRow,
  }) => {
    const isEditing = editingRow === item.key;
    const isCustom = item.key.startsWith("custom");
    const isReadOnly = item.autoMode || item.fixed;

    return (
      <div className={styles.salaryRow}>
        <div className={styles.salaryRowLabel}>
          {isEditing ? (
            <input
              value={item.label}
              onChange={() => updateEarning(item.key, "lable")}
              // onChange={() =>
              //   setEarnings((prev) =>
              //     prev.map((e) => {
              //       if (e.key !== item.key) return e;
              //       const updated = {
              //         ...e,
              //         ["label"]:
              //           "label" === "label"
              //             ? e.target.value
              //             : Number(e.target.value || 0),
              //       };

              //       if (
              //         "label" === "percent" &&
              //         updated.autoMode &&
              //         !updated.isBase
              //       ) {
              //         updated.value = Math.round(
              //           (basicSalary * Number(e.target.value || 0)) / 100,
              //         );
              //       }
              //       return updated;
              //     }),
              //   )
              // }
              onBlur={() => setEditingRow(null)}
              autoFocus
              style={{ width: "100%" }}
            />
          ) : (
            <>
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.autoMode && !item.isBase && (
                <span className={styles.salaryRowBadge}>{item.percent}%</span>
              )}
              {!item.autoMode && !item.isBase && item.percent > 0 && (
                <span className={styles.salaryRowBadgeCustom}>Custom</span>
              )}
            </>
          )}
        </div>

        {!item.isBase && !item.fixed && (
          <button
            type="button"
            className={styles.editBtn}
            title={
              item.autoMode ? "Switch to custom amount" : "Switch to % of Basic"
            }
            onClick={() => {
              if (isCustom) setEditingRow(isEditing ? null : item.key);
              else onToggleMode(item.key);
            }}
          >
            <FiEdit2 size={14} />
          </button>
        )}

        {item.autoMode && !item.isBase && !item.fixed && (
          <input
            type="number"
            className={styles.percentInput}
            value={item.percent === 0 ? "" : item.percent}
            onChange={(e) => onChange(item.key, "percent", e.target.value)}
            onFocus={(e) => e.target.select()}
            min="0"
            max="100"
            placeholder="%"
          />
        )}

        <input
          type="number"
          className={styles.salaryRowInput}
          value={isReadOnly ? item.value : item.value === 0 ? "" : item.value}
          // value={item.value}
          onChange={() => onChange(item.key, "value")}
          // onChange={(el) =>
          //   setEarnings((prev) =>
          //     prev.map((e) => {
          //       if (e.key !== item.key) return e;
          //       const updated = {
          //         ...e,
          //         ["label"]:
          //           "label" === "label"
          //             ? el.target.value
          //             : Number(el.target.value || 0),
          //       };

          //       if (
          //         "label" === "percent" &&
          //         updated.autoMode &&
          //         !updated.isBase
          //       ) {
          //         updated.value = Math.round(
          //           (basicSalary * Number(e.target.value || 0)) / 100,
          //         );
          //       }
          //       return updated;
          //     }),
          //   )
          // }
          onFocus={(e) => e.target.select()}
          readOnly={isReadOnly}
          min="0"
          placeholder="0"
        />
      </div>
    );
  };

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div>
      <div className={styles.pageGrid}>
        {/* LEFT — Salary Structure */}
        <div className={styles.salaryCard}>
          <h2 className={styles.salaryCardTitle}>Salary Structure</h2>
          <hr className="w-75" style={{ borderColor: "#E7E7E7" }} />
          <p className={styles.earningsLabel}>Earnings</p>
          {earnings.map((item) => (
            <SalaryRowItem
              key={item.key}
              item={item}
              onChange={updateEarning}
              onToggleMode={toggleEarningMode}
              editingRow={editingRow}
              setEditingRow={setEditingRow}
            />
          ))}
          <button
            type="button"
            className={styles.addRowBtn}
            onClick={addAllowance}
          >
            <FiPlus size={14} /> Add Allowance
          </button>
          <div className={styles.grossBox}>
            <span className={styles.grossBoxLabel}>Gross Salary</span>
            <span className={styles.grossBoxValue}>{fmt(grossSalary)}</span>
          </div>
          <p className={styles.deductionsLabel}>Deductions</p>
          {deductions.map((item) => (
            <SalaryRowItem
              key={item.key}
              item={item}
              onChange={updateDeduction}
              onToggleMode={toggleDeductionMode}
              editingRow={editingRow}
              setEditingRow={setEditingRow}
            />
          ))}
          <button
            type="button"
            className={styles.addRowBtn}
            onClick={addDeduction}
          >
            <FiPlus size={14} /> Add Deduction
          </button>
          <div className={styles.deductionBox}>
            <span className={styles.deductionBoxLabel}>Total Deductions</span>
            <span className={styles.deductionBoxValue}>
              {fmt(totalDeductions)}
            </span>
          </div>
          <div className={styles.netBox}>
            <div className={styles.netBoxRow}>
              <span className={styles.netBoxLabel}>Net Salary (Take Home)</span>
              <span className={styles.netBoxValue}>{fmt(netSalary)}</span>
            </div>
            <p className={styles.ctcHint}>
              Estimated cost to company (CTC): {fmt(ctcAnnual)} /year
            </p>
          </div>
        </div>

        {/* RIGHT — Bank + Payment */}
        <div>
          <div className={styles.bankCard}>
            <h2 className={styles.bankCardTitle}>Bank Account Details</h2>

            <div className={shared.row}>
              <div className={shared.field}>
                <label>
                  Bank Name <span className={shared.required}>*</span>
                </label>
                <input
                  name="bankName"
                  value={formData.bankName || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClass("bankName")}
                  placeholder="Enter Bank Name."
                />
                {touched.bankName && errors.bankName && (
                  <span className={shared.errorText}>{errors.bankName}</span>
                )}
              </div>
              <div className={shared.field}>
                <label>
                  Branch Name <span className={shared.required}>*</span>
                </label>
                <input
                  name="branchName"
                  value={formData.branchName || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClass("branchName")}
                  placeholder="Enter Branch Name"
                />
                {touched.branchName && errors.branchName && (
                  <span className={shared.errorText}>{errors.branchName}</span>
                )}
              </div>
            </div>

            <div className={shared.row}>
              <div className={shared.field}>
                <label>
                  Account Number <span className={shared.required}>*</span>
                </label>
                <div className={styles.maskedWrapper}>
                  <input
                    name="accountNumber"
                    type={showAccNum ? "text" : "password"}
                    value={formData.accountNumber || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={getInputClass("accountNumber")}
                    placeholder="••••••••4521"
                  />
                  <button
                    type="button"
                    className={styles.toggleMaskBtn}
                    onClick={() => setShowAccNum((v) => !v)}
                  >
                    {showAccNum ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                  </button>
                </div>
                {touched.accountNumber && errors.accountNumber && (
                  <span className={shared.errorText}>
                    {errors.accountNumber}
                  </span>
                )}
              </div>
              <div className={shared.field}>
                <label>
                  Confirm Account Number{" "}
                  <span className={shared.required}>*</span>
                </label>
                <div className={styles.maskedWrapper}>
                  <input
                    name="confirmAccountNumber"
                    type={showConfirmAcc ? "text" : "password"}
                    value={formData.confirmAccountNumber || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={getInputClass("confirmAccountNumber")}
                    placeholder="••••••••4521"
                  />
                  <button
                    type="button"
                    className={styles.toggleMaskBtn}
                    onClick={() => setShowConfirmAcc((v) => !v)}
                  >
                    {showConfirmAcc ? (
                      <FiEyeOff size={16} />
                    ) : (
                      <FiEye size={16} />
                    )}
                  </button>
                </div>
                {touched.confirmAccountNumber &&
                  errors.confirmAccountNumber && (
                    <span className={shared.errorText}>
                      {errors.confirmAccountNumber}
                    </span>
                  )}
              </div>
            </div>

            <div className={shared.row}>
              <div className={shared.field}>
                <label>
                  IFSC Code <span className={shared.required}>*</span>
                </label>
                <input
                  name="ifscCode"
                  value={formData.ifscCode || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClass("ifscCode")}
                  placeholder="Enter IFSC Code."
                />
                {touched.ifscCode && errors.ifscCode && (
                  <span className={shared.errorText}>{errors.ifscCode}</span>
                )}
              </div>
              <div className={shared.field}>
                <label>
                  Account Type <span className={shared.required}>*</span>
                </label>
                <select
                  name="accountType"
                  value={formData.accountType || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClass("accountType")}
                >
                  <option value="">Select Type</option>
                  {ACCOUNT_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                {touched.accountType && errors.accountType && (
                  <span className={shared.errorText}>{errors.accountType}</span>
                )}
              </div>
            </div>

            <div className={shared.field} style={{ marginBottom: "16px" }}>
              <label>MICR Code</label>
              <input
                name="micrCode"
                value={formData.micrCode || ""}
                onChange={handleChange}
                placeholder="Enter MICR code"
              />
            </div>

            <div className={shared.field}>
              <label>Cancelled Cheque / Passbook Copy</label>
              <div
                className={styles.chequeUpload}
                onClick={() => chequeRef.current?.click()}
              >
                <FiUploadCloud size={24} color="#2563eb" />
                <span className={styles.chequeUploadText}>
                  {formData.chequeName || "Drag & drop or Browse"}
                </span>
                <span className={styles.chequeUploadHint}>
                  PDF, JPG, PNG (Max 5MB)
                </span>
              </div>
              <input
                type="file"
                ref={chequeRef}
                style={{ display: "none" }}
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleChequeUpload}
              />
              {errors.cheque && (
                <span className={shared.errorText}>{errors.cheque}</span>
              )}
            </div>
          </div>

          {/* Payment Mode & Cycle */}
          <div className={styles.paymentCard}>
            <h2 className={styles.paymentCardTitle}>
              Payment Mode &amp; Cycle
            </h2>

            <div className={shared.field} style={{ marginBottom: "16px" }}>
              <label>Payment Mode</label>
              <div className={styles.radioGroup}>
                {PAYMENT_MODES.map((mode) => (
                  <label key={mode} className={styles.radioOption}>
                    <input
                      type="radio"
                      name="paymentMode"
                      value={mode}
                      checked={
                        (formData.paymentMode || "Bank Transfer") === mode
                      }
                      onChange={handleChange}
                    />
                    {mode}
                  </label>
                ))}
              </div>
            </div>

            <div className={shared.field}>
              <label>
                Payment Cycle <span className={shared.required}>*</span>
              </label>
              <select
                name="paymentCycle"
                value={formData.paymentCycle || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                className={getInputClass("paymentCycle")}
              >
                <option value="">Select Cycle</option>
                {PAYMENT_CYCLES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              {touched.paymentCycle && errors.paymentCycle && (
                <span className={shared.errorText}>{errors.paymentCycle}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Actions ── */}
      <div className={shared.actions}>
        <button
          type="button"
          className={shared.btnSecondary}
          onClick={handlePrev}
        >
          <FaArrowLeftLong size={14} /> &nbsp;Previous
        </button>
        <button
          type="button"
          className={shared.btnDraft}
          onClick={handleSaveDraft}
        >
          Save as Draft
        </button>
        <button
          type="button"
          className={shared.btnPrimary}
          onClick={handleNext}
        >
          Next Step &nbsp;
          <FaArrowRightLong size={14} />
        </button>
      </div>
    </div>
  );
};

export default SalaryBank;
