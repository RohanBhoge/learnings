# Online Python compiler (interpreter) to run Python online.
def TringularPattern(n):
    for i in range(n):
        for j in range(i):
            print(" ", end="")
        for k in range((n - i - 1) * 2 + 1):
            print("*", end="")
        for l in range(i):
            print(" ", end="")
        print()


TringularPattern(9)
