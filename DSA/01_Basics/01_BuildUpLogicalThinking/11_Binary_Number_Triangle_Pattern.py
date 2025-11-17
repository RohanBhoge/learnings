for i in range(5):
    if i % 2 == 0:
        count = 1
    else:
        count = 0
    for j in range(i + 1):
        print(count, end=" ")
        count = 1 - count
    print()
