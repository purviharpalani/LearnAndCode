#include <iostream>
using namespace std;

int segregate(int arr[], int n) {
    int j = 0;
    for (int i = 0; i < n; i++) {
        if (arr[i] <= 0) {
            swap(arr[i], arr[j]);
            j++;
        }
    }
    return j; 
}

int findMissingPositive(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        int correctIndex = arr[i] - 1;
        while (arr[i] > 0 && arr[i] <= n && arr[i] != arr[correctIndex]) {
            swap(arr[i], arr[correctIndex]);
            correctIndex = arr[i] - 1;
        }
    }

    for (int i = 0; i < n; i++) {
        if (arr[i] != i + 1) {
            return i + 1;
        }
    }
    return n + 1;
}

int findSmallestMissing(int arr[], int n) {
    int shift = segregate(arr, n);
    return findMissingPositive(arr + shift, n - shift);
}

int main() {
    int arr1[] = {2, 3, 7, 6, 8, -1, -10, 15};
    int arr2[] = {2, 3, -7, 6, 8, 1, -10, 15};
    int arr3[] = {1, 1, 0, -1, -2};

    int n1 = sizeof(arr1) / sizeof(arr1[0]);
    int n2 = sizeof(arr2) / sizeof(arr2[0]);
    int n3 = sizeof(arr3) / sizeof(arr3[0]);

    cout << "Missing number in arr1: " << findSmallestMissing(arr1, n1) << endl;
    cout << "Missing number in arr2: " << findSmallestMissing(arr2, n2) << endl;
    cout << "Missing number in arr3: " << findSmallestMissing(arr3, n3) << endl;

    return 0;
}
