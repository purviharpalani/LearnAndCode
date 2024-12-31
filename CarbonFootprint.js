var _a, _b;
var EmailType;
(function (EmailType) {
    EmailType[EmailType["SpamEmail"] = 0] = "SpamEmail";
    EmailType[EmailType["SentEmail"] = 1] = "SentEmail";
    EmailType[EmailType["ShortEmailOnPhone"] = 2] = "ShortEmailOnPhone";
    EmailType[EmailType["ShortEmailOnLaptop"] = 3] = "ShortEmailOnLaptop";
    EmailType[EmailType["LongEmailOnLaptop"] = 4] = "LongEmailOnLaptop";
    EmailType[EmailType["EmailBlast"] = 5] = "EmailBlast";
})(EmailType || (EmailType = {}));
var EmissionsInGramsPerEmail = (_a = {},
    _a[EmailType.SentEmail] = 0.05,
    _a[EmailType.SpamEmail] = 0.03,
    _a[EmailType.ShortEmailOnPhone] = 0.2,
    _a[EmailType.ShortEmailOnLaptop] = 0.3,
    _a[EmailType.LongEmailOnLaptop] = 17,
    _a[EmailType.EmailBlast] = 26,
    _a);
var getCarbonFootprint = /** @class */ (function () {
    function getCarbonFootprint(entityType, entity) {
        this.entityType = entityType;
        this.entity = entity;
        this.emailCounts = {};
    }
    getCarbonFootprint.prototype.setEmailCounts = function (emailCounts) {
        this.emailCounts = emailCounts;
    };
    getCarbonFootprint.prototype.calculateCarbonFootprint = function () {
        var carbonFootprint = {
            inboxWeightInKG: 0,
            sentWeightInKG: 0,
            spamWeightInKG: 0
        };
        carbonFootprint.inboxWeightInKG =
            ((this.emailCounts[EmailType.ShortEmailOnPhone] || 0) * EmissionsInGramsPerEmail[EmailType.ShortEmailOnPhone] +
                (this.emailCounts[EmailType.ShortEmailOnLaptop] || 0) * EmissionsInGramsPerEmail[EmailType.ShortEmailOnLaptop] +
                (this.emailCounts[EmailType.LongEmailOnLaptop] || 0) * EmissionsInGramsPerEmail[EmailType.LongEmailOnLaptop] +
                (this.emailCounts[EmailType.EmailBlast] || 0) * EmissionsInGramsPerEmail[EmailType.EmailBlast]) /
                1000;
        carbonFootprint.sentWeightInKG =
            ((this.emailCounts[EmailType.SentEmail] || 0) * EmissionsInGramsPerEmail[EmailType.SentEmail]) / 1000;
        carbonFootprint.spamWeightInKG =
            ((this.emailCounts[EmailType.SpamEmail] || 0) * EmissionsInGramsPerEmail[EmailType.SpamEmail]) / 1000;
        return carbonFootprint;
    };
    getCarbonFootprint.prototype.generateReport = function (carbonFootprint) {
        return "\n        emailId : ".concat(this.entity.email, "\n        source : ").concat(this.entityType[0], "\n        inbox : ").concat(carbonFootprint.inboxWeightInKG.toFixed(2), " KG\n        sent : ").concat(carbonFootprint.sentWeightInKG.toFixed(2), " KG\n        spam : ").concat(carbonFootprint.spamWeightInKG.toFixed(2), " KG\n        ");
    };
    return getCarbonFootprint;
}());
var entityType = ['email', 'server', 'something'];
var entity = { email: "purviharpalani@gmail.com" };
var emailCounts = (_b = {},
    _b[EmailType.SpamEmail] = 2000,
    _b[EmailType.SentEmail] = 450,
    _b[EmailType.ShortEmailOnPhone] = 300,
    _b[EmailType.ShortEmailOnLaptop] = 240,
    _b[EmailType.LongEmailOnLaptop] = 10,
    _b[EmailType.EmailBlast] = 3,
    _b);
var newUser = new getCarbonFootprint(entityType, entity);
newUser.setEmailCounts(emailCounts);
var carbonFootprint = newUser.calculateCarbonFootprint();
var report = newUser.generateReport(carbonFootprint);
console.log(report);
