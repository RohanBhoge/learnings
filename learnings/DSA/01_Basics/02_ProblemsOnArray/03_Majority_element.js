let arr = [1, 2, 1, 1, 5], majority = 0, n = arr.length

for (let el of arr) {
    for (let ele of arr) {
        if (el == ele) {
            majority++
        }
    }
    if (majority > (n / 2)) {
        console.log("majority element is:-", el)
        break
    }
}