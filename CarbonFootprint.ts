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
    
    calculateAndGenerateReport(): string {
        const ShortEmailOnPhoneWeightInKG = ((this.emailCounts[EmailType.ShortEmailOnPhone] || 0) * EmissionsInGramsPerEmail[EmailType.ShortEmailOnPhone])/1000;

        const ShortEmailOnLaptopWeightInKG = ((this.emailCounts[EmailType.ShortEmailOnLaptop] || 0) * EmissionsInGramsPerEmail[EmailType.ShortEmailOnLaptop])/1000;
        
        const LongEmailOnLaptopWeightInKG = ((this.emailCounts[EmailType.LongEmailOnLaptop] || 0) * EmissionsInGramsPerEmail[EmailType.LongEmailOnLaptop])/1000;

        const EmailBlastWeightInKG = ((this.emailCounts[EmailType.EmailBlast] || 0) * EmissionsInGramsPerEmail[EmailType.EmailBlast])/1000;

        const sentWeightInKG = ((this.emailCounts[EmailType.SentEmail] || 0) * EmissionsInGramsPerEmail[EmailType.SentEmail])/1000;

        const spamWeightInKG = ((this.emailCounts[EmailType.SpamEmail] || 0) * EmissionsInGramsPerEmail[EmailType.SpamEmail])/1000;

        const inboxWeightInKG = ShortEmailOnPhoneWeightInKG + ShortEmailOnLaptopWeightInKG + LongEmailOnLaptopWeightInKG + EmailBlastWeightInKG;
        return `
        emailId : ${this.entity.email}
        source : ${this.entityType[0]}
        inbox : ${inboxWeightInKG.toFixed(2)} KG
        sent : ${sentWeightInKG.toFixed(2)} KG
        spam : ${spamWeightInKG.toFixed(2)} KG
        `;
    }   
}



let entityType = ['email', 'server', 'something'];
let entity = { email: "purviharpalani@gmail.com" };
const emailCounts: Record<EmailType, number> = {
    [EmailType.SpamEmail]: 2000,
    [EmailType.SentEmail]: 450,
    [EmailType.ShortEmailOnPhone]: 300,
    [EmailType.ShortEmailOnLaptop]: 240,
    [EmailType.LongEmailOnLaptop]: 10,
    [EmailType.EmailBlast]: 3
};

const newUser = new getCarbonFootprint(entityType, entity);
newUser.setEmailCounts(emailCounts);
const report = newUser.calculateAndGenerateReport();
console.log(report);