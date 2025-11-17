def Alpha_Hill_Pattern(n):
    for i in range(n):
        for j in range(n - i):
            print(" ", end=" ")
        for k in range(i + 1):
            print(chr(65 + k), end=" ")
        for l in range(i):
            print(chr(65 + i - l - 1), end=" ")
        print()


Alpha_Hill_Pattern(5)
