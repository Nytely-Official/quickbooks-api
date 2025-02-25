/**
 * The Customer Object
 */
export interface Customer {
	domain: string;
	FamilyName: string;
	DisplayName: string;
	DefaultTaxCodeRef?: ReferenceType;
	PrimaryEmailAddr: EmailAddress;
	PreferredDeliveryMethod: string;
	GivenName: string;
	FullyQualifiedName: string;
	BillWithParent: boolean;
	Job?: boolean;
	BalanceWithJobs: number;
	PrimaryPhone: PhoneNumber;
	Active?: boolean;
	AlternatePhone?: PhoneNumber;
	WebAddr?: WebSiteAddress;
	ParentRef?: ReferenceType;
	MetaData: ModificationMetaData;
	BillAddr?: PhysicalAddress;
	MiddleName?: string;
	Notes?: string;
	Taxable?: boolean;
	Balance: number;
	OpenBalanceDate?: Date;
	SyncToken: string;
	CompanyName?: string;
	ShipAddr?: PhysicalAddress;
	Source?: string;
	PaymentMethodRef?: ReferenceType;
	IsProject?: boolean;
	PrintOnCheckName?: string;
	PrimaryTaxIdentifier?: string;
	GSTRegistrationType?: string;
	sparse: boolean;
	Id: string;
}

/**################### Supporting Interfaces ###################*/
/**
 * The Reference Type
 */
interface ReferenceType {
	value: string;
	name?: string;
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
