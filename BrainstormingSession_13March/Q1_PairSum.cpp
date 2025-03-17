#include <iostream>
#include <bits/stdc++.h>
using namespace std;

int main()
{
    int a[] = {8, 2, 7, 5, 5, 3, 4, 2, 8};
    
    int n = sizeof(a) / sizeof(a[0]);
    int sum = 10;
    
    int i=0;
    int j=n-1;
    
    while(i <= n/2){
        if(a[i] + a[j] == sum){
            cout<<a[i]<<", "<<a[j]<<"\n";
            i++;
            j--;
        }
        else if(a[i] + a[j] > sum){
            j--;
        }
        else if(a[i] + a[j] <sum){
            i++;
        }
    }
    return 0;
}