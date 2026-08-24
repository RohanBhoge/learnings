def dsa(n):
    for i in range(n):
        for j in range(1 + i):
            print(j + 1, end="")
        for k in range((n - i) * 2):
            print(" ", end="")
        for l in range(i + 1):
            print((i + 1) - l, end="")
        print()


dsa(5)