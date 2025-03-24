class Employee {
    name: string;
    age: number;
    salary: number;

    constructor(name: string, age: number, salary: number) {
        this.name = name;
        this.age = age;
        this.salary = salary;
    }

    getName(): string {
        return this.name;
    }

    setName(name: string): void {
        this.name = name;
    }

    getAge(): number {
        return this.age;
    }

    setAge(age: number): void {
        this.age = age;
    }

    getSalary(): number {
        return this.salary;
    }

    setSalary(salary: number): void {
        this.salary = salary;
    }
}

const employee = new Employee("Purvi Harpalani", 21, 50000);




/* 
Question
Is 'employee' an object or a data structure? Why?

Answer 
'Employee' is not strictly an object since its data members are not private, making the data directly accessible.  
'Employee' is also not purely a data structure as it includes functions to access the data. 
Therefore, 'Employee' can be considered a hybrid.
*/