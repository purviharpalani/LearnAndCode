enum EmailType{
    SpamEmail,
    SentEmail,
    ShortEmailOnPhone,
    ShortEmailOnLaptop,
    LongEmailOnLaptop,
    EmailBlast
}

const EmissionsInGramsPerEmail = {
    [EmailType.SentEmail]: 0.05,
    [EmailType.SpamEmail]: 0.03,
    [EmailType.ShortEmailOnPhone]: 0.2, 
    [EmailType.ShortEmailOnLaptop]: 0.3,
    [EmailType.LongEmailOnLaptop]: 17,
    [EmailType.EmailBlast]: 26
};

   
class getCarbonFootprint{
    entityType: string[];
    entity: Record<string, string>;
    emailCounts: Record<EmailType, number>;

    constructor(entityType: string[], entity: Record<string, string>){
        this.entityType = entityType;
        this.entity = entity;
        this.emailCounts = {} as Record<EmailType, number>;
    }

    setEmailCounts(emailCounts: Record<EmailType, number>) {
        this.emailCounts = emailCounts;
    }
    
    calculateCarbonFootprint(): Record<string, number> {
        const carbonFootprint = {
            inbox: 0,
            sent: 0,
            spam: 0
        };

        carbonFootprint.inbox =
            ((this.emailCounts[EmailType.ShortEmailOnPhone] || 0) * EmissionsInGramsPerEmail[EmailType.ShortEmailOnPhone] +
                (this.emailCounts[EmailType.ShortEmailOnLaptop] || 0) * EmissionsInGramsPerEmail[EmailType.ShortEmailOnLaptop] +
                (this.emailCounts[EmailType.LongEmailOnLaptop] || 0) * EmissionsInGramsPerEmail[EmailType.LongEmailOnLaptop] +
                (this.emailCounts[EmailType.EmailBlast] || 0) * EmissionsInGramsPerEmail[EmailType.EmailBlast]) /
            1000;

        carbonFootprint.sent =
            ((this.emailCounts[EmailType.SentEmail] || 0) * EmissionsInGramsPerEmail[EmailType.SentEmail]) / 1000;

        carbonFootprint.spam =
            ((this.emailCounts[EmailType.SpamEmail] || 0) * EmissionsInGramsPerEmail[EmailType.SpamEmail]) / 1000;

        return carbonFootprint;
    }

    generateReport(carbonFootprint: Record<string, number>): string {
        return `
        emailId : ${this.entity.email}
        source : ${this.entityType[0]}
        inbox : ${carbonFootprint.inbox.toFixed(2)} KG
        sent : ${carbonFootprint.sent.toFixed(2)} KG
        spam : ${carbonFootprint.spam.toFixed(2)} KG
        `;
    }
}



let entityType = ['email', 'server', 'something'];
let entity = { email: "purviharpalani@gmail.com" };
const emailCounts: Record<EmailType, number> = {
    [EmailType.SpamEmail]: 2000,
    [EmailType.SentEmail]: 450,
    [EmailType.ShortEmailOnPhone]: 300,g
    [EmailType.ShortEmailOnLaptop]: 240,
    [EmailType.LongEmailOnLaptop]: 10,
    [EmailType.EmailBlast]: 3
};

const newUser = new getCarbonFootprint(entityType, entity);
newUser.setEmailCounts(emailCounts);
const carbonFootprint = newUser.calculateCarbonFootprint();
const report = newUser.generateReport(carbonFootprint);
console.log(report);