def check(nums):
    n = len(nums)
    rotations = 0

    for i in range(1, n):
        if nums[i] < nums[i - 1]:
            rotations += 1

    if nums[0] < nums[-1]:
        rotations += 1
    print(rotations <= 1)
    return rotations <= 1

check([3, 4, 5, 1, 2])