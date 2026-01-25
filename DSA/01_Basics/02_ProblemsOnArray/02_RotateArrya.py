def rotate( nums, k):
        """
        :type nums: List[int]
        :type k: int
        :rtype: None Do not return anything, modify nums in-place instead.
        """
        l=len(nums)
        revers(nums,0,l-1)
        revers(nums,0,k-1)
        revers(nums,k,l-1)
        print(nums)
        return nums

def revers(nums,st,end):
     while(st<=end):
            temp=nums[st]
            nums[st]=nums[end]
            nums[end]=temp
            st+=1
            end-=1
          
rotate([1,2,3,4,5,6,7],3)