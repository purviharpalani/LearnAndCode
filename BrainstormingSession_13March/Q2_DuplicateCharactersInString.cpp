#include <iostream>
#include <unordered_map>
using namespace std;

void findDuplicateCharacters(const string &str) {
    unordered_map<char, int> freqMap;

    for (char ch : str) {
        freqMap[ch]++;
    }

    cout << "Duplicate characters in \"" << str << "\":\n";
    for (const auto &pair : freqMap) {
        if (pair.second > 1) {
            cout << pair.first << " - " << pair.second << " times\n";
        }
    }
}

int main() {
    string str1 = "java";
    string str2 = "programming";

    findDuplicateCharacters(str1);
    cout << endl;
    findDuplicateCharacters(str2);

    return 0;
}
