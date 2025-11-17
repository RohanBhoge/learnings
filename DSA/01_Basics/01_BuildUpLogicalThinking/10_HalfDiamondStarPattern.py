def TringularPattern(n):
    for i in range(n - 1):
        for j in range(i + 1):
            print("*", end="")
        print()
    for m in range(n):
        for l in range(n - m):
            print("*", end="")
        print()


TringularPattern(9)
