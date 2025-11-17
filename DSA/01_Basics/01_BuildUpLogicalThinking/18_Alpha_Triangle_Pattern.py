def Alpha_Triangle_Pattern(n):
    for i in range(n):
        for j in range(i + 1):
            print(chr(65 + (n - i) + j - 1), end=" ")
        print()


Alpha_Triangle_Pattern(5)
