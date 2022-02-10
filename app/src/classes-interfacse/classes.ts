abstract class Department {
    static fiscalYear = 2022;

    protected constructor(protected readonly id: number, protected readonly name : string, protected readonly employees: string[]) {
    }

    abstract describe(this: Department): void;

    addEmployees(this: Department, employee: string) {
        this.employees.push(employee);
    }

    printEmployees(this: Department) {
        console.log('Amount of employees: ' + this.employees.length);
        console.log(this.employees);
    }

    static createEmployee(name: string) {
        return {name : name};
    }

}

// will create a new object with the copy of the describe function it only will take the name of the new object
// if we add private to property it s no longer possible to create Department object from plain object
// const departmentCopy = {
//     name: 'new name',
//     describe: department.describe,
//     employees: ['Hank'],
//     addEmployees: department.addEmployees,
//     printEmployees: department.printEmployees
// }

// departmentCopy.describe();

// const departmentCopy2 = {describe: department.describe}
// not allowed because we define this: Department in describe function it will protect us for being used with an object which does not all properties of Department
//departmentCopy2.describe();

class ITDepartment extends Department {
    constructor(id: number, members : string[], private readonly admins: string[] ) {
        super(id, 'IT', members);
    }

    describe(): void {
        console.log(`IT Department: id => (${this.id}), name => (${this.name})`);
    }

    showAdmins() {
        console.log(this.admins);
    }
}

const idDepartment = new ITDepartment(12, ['JOE'], ['FRANK']);
idDepartment.addEmployees('Clair');

class AccountingDepartment extends Department {
    private static instance: AccountingDepartment

    private lastReport : string | undefined;

    private constructor(id : number, private reports : string[]) {
        super(id, 'Accounting', []);

        if (reports.length > 0) {
            this.lastReport = reports[reports.length];
        }
    }

    static createAccountingDepartment(id : number, reports : string[]) {
        if (AccountingDepartment.instance) {
            return AccountingDepartment.instance;
        }

        AccountingDepartment.instance = new AccountingDepartment(id, reports);

        return AccountingDepartment.instance;
    }

    describe(): void {
        console.log(` Accounting Department: id => (${this.id}), name => (${this.name})`);
    }


    addEmployees(employee: string) {
        if (employee === 'MAX') {
            return;
        }

        this.employees.push(employee);
    }

    addReport(report : string) {
        this.reports.push(report);
        this.lastReport = report;
    }

    showReports() {
        console.log(this.reports);
    }

    get lastAddedReport() {
        if (!this.lastReport) {
            throw new Error('no report found');
        }

        return this.lastReport;
    }

    set lastAddedReport(report:string) {
        this.lastReport = report;
    }

}

const accounting = AccountingDepartment.createAccountingDepartment(3, ['import']);
const accounting2 = AccountingDepartment.createAccountingDepartment(13, ['export']);
console.log(accounting);
console.log(accounting2);

accounting.addReport('export');

accounting.showReports();

console.log(accounting.lastAddedReport);

accounting.lastAddedReport = 'Overwrite report';

console.log(Math.pow(1, 2));

const newEmployee = Department.createEmployee('Hank');
console.log(newEmployee);
console.log(Department.fiscalYear);

