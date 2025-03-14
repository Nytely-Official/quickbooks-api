/**
 * The Company Info Object
 */
export interface CompanyInfo {
    SyncToken: string;
    domain: string;
    LegalAddr: PhysicalAddress;
    SupportedLanguages: string;
    CompanyName: string;
    Country: string;
    CompanyAddr: PhysicalAddress;
    sparse: boolean;
    Id: string;
    WebAddr: WebSiteAddress;
    FiscalYearStartMonth: string;
    CustomerCommunicationAddr: PhysicalAddress;
    PrimaryPhone: PhoneNumber;
    LegalName: string;
    CompanyStartDate: string;
    EmployerId: string;
    Email: EmailAddress;
    NameValue: NameValuePair[];
    MetaData: ModificationMetaData;
}

/**################### Supporting Interfaces ###################*/
/**
 * The Name Value Pair Type
 */
interface NameValuePair {
    Name: string;
    Value: string;
}

/**
 * The Web Site Address Type
 */
interface WebSiteAddress {
    URI?: string;
}

/**
 * The Physical Address Type
 */
interface PhysicalAddress {
    Id?: string;
    Line1?: string;
    Line2?: string;
    Line3?: string;
    Line4?: string;
    Line5?: string;
    City?: string;
    Country?: string;
    CountrySubDivisionCode?: string;
    PostalCode?: string;
    Lat?: string;
    Long?: string;
}

/**
 * The Email Address Type
 */
interface EmailAddress {
    Address?: string;
}

/**
 * The Modification Meta Data Type
 */
interface ModificationMetaData {
    CreateTime?: string;
    LastUpdatedTime?: string;
    LastUpdatedBy?: string;
}

/**
 * The Phone Number Type
 */
interface PhoneNumber {
    FreeFormNumber: string;
}
