def Symmetric_Void_Pattern(n):
    for i in range(n):
        for j in range(n - i):
            print("*", end="")
        for k in range(2 * i):
            print(" ", end="")
        for l in range(n - i):
            print("*", end="")
        print()
    for i in range(n):
        for j in range(i + 1):
            print("*", end="")
        for k in range((2 * n - 2 * i) - 2):
            print(" ", end="")
        for l in range(i + 1):
            print("*", end="")
        print()


Symmetric_Void_Pattern(5)
