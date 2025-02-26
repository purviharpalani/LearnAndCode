public class CustomerSearch
{
    private readonly DatabaseContext db;

    public CustomerSearch(DatabaseContext database)
    {
        this.db = database;
    }

    // Search customer by country
    public List<Customer> SearchByCountry(string country)
    {
        return db.customers
                 .Where(c => c.Country.Contains(country))
                 .OrderBy(c => c.CustomerID)
                 .ToList();
    }

    // Search customer by company name
    public List<Customer> SearchByCompanyName(string company)
    {
        return db.customers
                 .Where(c => c.CompanyName.Contains(company))
                 .OrderBy(c => c.CustomerID)
                 .ToList();
    }

    // Search customer by contact person
    public List<Customer> SearchByContact(string contact)
    {
        return db.customers
                 .Where(c => c.ContactName.Contains(contact))
                 .OrderBy(c => c.CustomerID)
                 .ToList();
    }

    // Export customer data to CSV format
    public string ExportToCSV(List<Customer> customers)
    {
        var sb = new StringBuilder();
        foreach (var customer in customers)
        {
            sb.AppendFormat("{0},{1},{2},{3}", customer.CustomerID, customer.CompanyName, customer.ContactName, customer.Country);
            sb.AppendLine();
        }
        return sb.ToString();
    }
}
