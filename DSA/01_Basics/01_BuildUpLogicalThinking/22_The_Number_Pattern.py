def The_Number_Pattern(n):
    for i in range(n * 2 - 1):
        for j in range(n * 2 - 1):
            top = i
            bottom = j
            right = (2 * n - 2) - j
            left = (2 * n - 2) - i
            print(n - min(min(top, bottom), min(left, right)), end=" ")
        print()


The_Number_Pattern(5)
