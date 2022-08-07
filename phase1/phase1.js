function findLongestConsecutiveSubSequence(nums, n) {
    let seq = new Set();
    let count = 0;
     for (let i = 0; i < n; i++){
         seq.add(nums[i]);
     }
    for (let i = 0; i < n; i++){
        if (!seq.has(nums[i] - 1)){
            let j = nums[i];
            while (seq.has(j))
                j++;
                count = Math.max(count, j - nums[i]);
        }
    }
    return count;
}

console.log("longest consecutive sub sequence:",findLongestConsecutiveSubSequence([2,6,1,9,4,5,3], 7));
console.log("longest consecutive sub sequence:",findLongestConsecutiveSubSequence([1,9,3,10,4,20,2], 7));

