/*

difficulty: MEDIUM

You are given N counters, initially set to 0, and you have two possible operations on them:

increase(X) − counter X is increased by 1,
max counter − all counters are set to the maximum value of any counter.
A non-empty array A of M integers is given. This array represents consecutive operations:

if A[K] = X, such that 1 ≤ X ≤ N, then operation K is increase(X),
if A[K] = N + 1 then operation K is max counter.
For example, given integer N = 5 and array A such that:

    A[0] = 3
    A[1] = 4
    A[2] = 4
    A[3] = 6
    A[4] = 1
    A[5] = 4
    A[6] = 4
the values of the counters after each consecutive operation will be:

    (0, 0, 1, 0, 0)
    (0, 0, 1, 1, 0)
    (0, 0, 1, 2, 0)
    (2, 2, 2, 2, 2)
    (3, 2, 2, 2, 2)
    (3, 2, 2, 3, 2)
    (3, 2, 2, 4, 2)
The goal is to calculate the value of every counter after all operations.

Write a function:

function solution(N, A);

that, given an integer N and a non-empty array A consisting of M integers, returns a sequence of integers representing the values of the counters.

Result array should be returned as an array of integers.

For example, given:

    A[0] = 3
    A[1] = 4
    A[2] = 4
    A[3] = 6
    A[4] = 1
    A[5] = 4
    A[6] = 4
the function should return [3, 2, 2, 4, 2], as explained above.

Write an efficient algorithm for the following assumptions:

N and M are integers within the range [1..100,000];
each element of array A is an integer within the range [1..N + 1].

*/

// first attempt (NOT_PERFORMANT)


function solutionNAIVE(N, A) {
    let counters = Array(N).fill(0)
    let currentMaxCounter = 0
    for(let K in A) {
        let k = Number(K)
        const x = A[k]
        const i = x - 1
        if(1 <= x && x <= N) {
            counters[i] =  counters[i] + 1
            if(counters[i] > currentMaxCounter) {
                currentMaxCounter = counters[i]
            }
        } else if (x === N + 1 ){
            counters = Array(N).fill(currentMaxCounter)
        }
    }
    return counters 
}


// Performant solution

function solution(N, A) {
    let counters = Array(N).fill(0)
    let currentMaxCounter = 0
    let lastResetCounter = 0

    for(let K in A) {
        let k = Number(K)
        const x = A[k]
        const i = x - 1

        if(x === N + 1) {
            // we know that all elements of counters should be reset
            // we will recent counters lazily only as needed
            lastResetCounter = currentMaxCounter
        }
        if(1 <= x && x <= N) {
            if(counters[i] < lastResetCounter)  {
                // this counter's value is out of date
                // this means this counter should have been reset (but we didn't yet)
                // the real value should be the what it should be during the last reset
                // then increment by 1 as per rule
                counters[i] = lastResetCounter + 1
            } else {
                // we know that this counter's values is up to date
                // as it is bigger that when it was last reset
                // increment by 1 as per rule
                counters[i] = counters[i] + 1
            }
            // update the currently known max value inside the counters array if needed
            if(counters[i] > currentMaxCounter) {
                currentMaxCounter = counters[i]
            }
        }
    }

    for(let K in counters) {
        let k = Number(K)
        // update all elements that are out of date
        if(counters[k] < lastResetCounter ) {
            counters[k] = lastResetCounter
        }
    }

    return counters
}


