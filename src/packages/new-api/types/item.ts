import type { MetaData, ReferenceType } from "./defs";
import type { Prettify } from "./helpers";

export type Item = {
    /**
     * Unique Identifier for an Intuit entity (object).
     * Required for update.
     * @filterable
     * @sortable
     * @defaultSortOrder ASC
     * @systemDefined
     * @requiredForUpdate
     */
    readonly Id: string;

    /**
     * Classification that specifies the use of this item (FR companies only).
     * Read-only after create.
     * Valid values include: Product, Service.
     * @minorVersion 3
     */
    ItemCategoryType?: string;

    /**
     * Name of the item. This value is unique.
     * @max 100 characters
     * @filterable
     * @sortable
     * @required
     */
    Name: string;

    /**
     * Version number of the entity. Required for update.
     * @systemDefined
     * @requiredForUpdate
     */
    readonly SyncToken: string;

    /**
     * Date of opening balance for the inventory transaction.
     * Required for Inventory type items.
     */
    InvStartDate?: string;

    /**
     * Classification that specifies the use of this item.
     * For minorVersion < 4: read-only/system-defined based on other fields.
     * For minorVersion = 4: explicit and required.
     * Valid: Inventory | Service | NonInventory
     * @minorVersion 4
     * @filterable
     * @sortable
     */
    Type?: ItemType;

    /**
     * Current quantity of the Inventory items available for sale.
     * Required for Inventory type items.
     */
    QtyOnHand?: number;

    /**
     * Reference to the Inventory Asset account that tracks inventory value.
     * Required for Inventory item types.
     */
    AssetAccountRef?: ReferenceType;

    /**
     * Stock keeping unit for this Item.
     * @max 100 characters
     * @minorVersion 4
     * @filterable
     */
    Sku?: string;

    /**
     * True if the sales tax is included in the item amount.
     */
    SalesTaxIncluded?: boolean;

    /**
     * True if there is quantity on hand to be tracked (Inventory items only).
     * Once true, cannot be set back to false.
     */
    TrackQtyOnHand?: boolean;

    /**
     * Reference to the sales tax code for the Sales item.
     */
    SalesTaxCodeRef?: ReferenceType;

    /**
     * Reference to the Class for the item.
     * @minorVersion 41
     */
    ClassRef?: ReferenceType;

    /**
     * The source type of the transactions created by QuickBooks Commerce.
     * Valid values include: QBCommerce
     * @minorVersion 59
     */
    Source?: string;

    /**
     * True if the purchase tax is included in the item amount.
     */
    PurchaseTaxIncluded?: boolean;

    /**
     * Description of the item.
     * @max 4000 characters
     */
    Description?: string;

    /**
     * Sales tax abatement rate (IN locales).
     * @minorVersion 3
     */
    AbatementRate?: number;

    /**
     * If true, this is a sub item; if false/null, top-level item.
     */
    SubItem?: boolean;

    /**
     * If true, transactions for this item are taxable (US companies only).
     */
    Taxable?: boolean;

    /**
     * Text to display on invoices to denote Unit of Measure.
     * @max 25 characters
     * @minorVersion 33
     */
    UQCDisplayText?: string;

    /**
     * Minimum quantity threshold to restock an inventory item.
     */
    ReorderPoint?: number;

    /**
     * Purchase description for the item.
     * @max 1000 characters
     */
    PurchaseDesc?: string;

    /**
     * Descriptive information (read-only).
     */
    MetaData?: MetaData;

    /**
     * Reference to the preferred vendor of this item.
     * @minorVersion 31
     */
    PrefVendorRef?: ReferenceType;

    /**
     * If true, the object is currently enabled for use by QuickBooks.
     * @filterable
     */
    Active?: boolean;

    /**
     * Id of Standard Unit of Measure (UQC) according to GST rule.
     * @minorVersion 33
     */
    UQCId?: Prettify<keyof UnitsOfMeasure>;

    /**
     * Sales tax reverse charge rate (IN locales).
     * @minorVersion 3
     */
    ReverseChargeRate?: number;

    /**
     * Reference to the purchase tax code for the item.
     */
    PurchaseTaxCodeRef?: ReferenceType;

    /**
     * Sales tax service type (IN locales).
     * @minorVersion 3
     */
    ServiceType?: string;

    /**
     * Amount paid when buying or ordering the item (home currency).
     * @max 99999999999 characters
     */
    PurchaseCost?: number;

    /**
     * The immediate parent of a sub item in the hierarchical Item:SubItem list.
     * Required if SubItem is true.
     */
    ParentRef?: ReferenceType;

    /**
     * Unit price / rate or discount/tax rate (fraction) for the item.
     * @max 99999999999 characters
     * @sortable
     */
    UnitPrice?: number;

    /**
     * Fully qualified name of the entity (system-defined).
     * @filterable
     * @systemDefined
     */
    readonly FullyQualifiedName?: string;

    /**
     * Expense account used to pay the vendor for this item.
     * Required for Inventory, NonInventory, and Service item types.
     */
    ExpenseAccountRef?: ReferenceType;

    /**
     * Level in the hierarchy (0 = top level; limited to 5 levels).
     * @systemDefined
     */
    readonly Level?: number;

    /**
     * Posting account to record proceeds from sale of this item.
     * Required for Inventory and Service item types.
     */
    IncomeAccountRef?: ReferenceType;

    /**
     * Tax classification reference (minorVersion 34).
     * @minorVersion 34
     */
    TaxClassificationRef?: ReferenceType;
}

export type { Item as default };

export type ItemType = 'Inventory' | 'Service' | 'NonInventory';

export type UnitsOfMeasure = {
    BAG: "BAGS",
    BAL: "BALE",
    BDL: "BUNDLES",
    BKL: "BUCKLES",
    BOU: "BILLIONS OF UNITS",
    BOX: "BOX",
    BTL: "BOTTLES",
    BUN: "BUNCHES",
    CAN: "CANS",
    CBM: "CUBIC METER",
    CCM: "CUBIC CENTIMETER",
    CMS: "CENTIMETER",
    CTN: "CARTONS",
    DOZ: "DOZEN",
    DRM: "DRUM",
    GGR: "GREAT GROSS",
    GMS: "GRAMS",
    GRS: "GROSS",
    GYD: "GROSS YARDS",
    KGS: "KILOGRAMS",
    KLR: "KILOLITER",
    KME: "KILOMETRE",
    MLT: "MILLILITRE",
    MTR: "METERS",
    NOS: "NUMBERS",
    PAC: "PACKS",
    PCS: "PIECES",
    PRS: "PAIRS",
    QTL: "QUINTAL",
    ROL: "ROLLS",
    SET: "SETS",
    SQF: "SQUARE FEET",
    SQM: "SQUARE METERS",
    SQY: "SQUARE YARDS",
    TBS: "TABLETS",
    TGM: "TEN GROSS",
    THD: "THOUSANDS",
    TON: "TONNES",
    TUB: "TUBES",
    UGS: "US GALLONS",
    UNT: "UNITS",
    YDS: "YARDS",
    OTH: "OTHERS"
};

export type ServiceType = 'ADVT' | 'AIRPORTSERVICES' | 'AIRTRANSPORT'
    | 'AIRTRVLAGNT' | 'ARCHITECT' | 'ASSTMGMT' | 'ATMMAINTENANCE' | 'AUCTIONSERV'
    | 'AUTHSERST' | 'BANKANDFIN' | 'BEAUTYPARLOR' | 'BROADCAST' | 'BUSINESSAUX'
    | 'BUSINESSEXHIBITION' | 'BUSINESSSUPPORTSERV' | 'CA' | 'CABLEOPTR' | 'CARGOHAND'
    | 'CLEANINGSERV' | 'CLEARANDFORW' | 'CLUBSANDASSSERVICE' | 'COMMCOACHORTRAINING'
    | 'CONSENG' | 'CONSTRCOMMERCIALCOMPLEX' | 'CONTAINERRAILTRANS' | 'CONVSERV'
    | 'COSTACC' | 'COURIER' | 'CREDITCARD' | 'CREDITRATAGNCY' | 'CRUISESHIPTOUR'
    | 'CS' | 'CUSHOUSEAG' | 'DESIGNSERV' | 'DEVELOPSUPPLYCONTENT' | 'DREDGING'
    | 'DRYCLEANING' | 'ERECTIONCOMMORINSTALL' | 'EVENTMGMT' | 'FASHIONDES'
    | 'FOREXBROKING' | 'FORWARDCONTRACT' | 'FRANCHISESERV' | 'GENERALINSURANCE'
    | 'GOODSTRANSPORT' | 'HEALTHCLUBANDFITNESS' | 'INFORMATIONSERV' | 'INSURAUX'
    | 'INTDEC' | 'INTELLECTUALPROPERTY' | 'INTERNATIONALAIRTRAVEL' | 'INTERNETCAFE'
    | 'INTERNETTELEPHONY' | 'LIFEINS' | 'MAILLISTCOMPILE' | 'MANDAPKEEPER'
    | 'MANPWRRECRUIT' | 'MGMTCONSUL' | 'MGMTMAINTREPAIR' | 'MININGOIL' | 'MKTRESAGNCY'
    | 'ONLINEINFORMRETRIEVAL' | 'OPINIONPOLL' | 'OUTDOORCATERING' | 'PACKAGINGSERV'
    | 'PANDALSHAMIANA' | 'PHOTOGRAPHY' | 'PORT' | 'PORTSER' | 'PROCESSCLEARHOUSE'
    | 'PUBLICRELATIONMGMT' | 'RAILTRAVELAGNT' | 'REALESTAGT' | 'RECOVERYAGENTS'
    | 'REGISTRARSERV' | 'RENTACAB' | 'RENTINGIMMOVABLEPROP' | 'RESIDENTIALCOMPLEXCONST'
    | 'SALEOFSPACEFORADVT' | 'SCANDTECHCONSUL' | 'SECAG' | 'SERVICESPROVIDEDFORTRANSACTION'
    | 'SHARETRANSFERSERV' | 'SHIPMGMT' | 'SITEPREP' | 'SOUNDRECORD' | 'SPONSORSHIP'
    | 'STAG' | 'STOCKBROKING' | 'STOCKEXCHGSERV' | 'STORANDWAREHOUSING' | 'SUPPLYTANGIBLEGOODS'
    | 'SURVEYANDMAPMAKING' | 'SURVEYMINERALS' | 'TECHINSPECTION' | 'TECHTESTING'
    | 'TELECOMMUNICATIONSERV' | 'TELEVISIONANDRADIO' | 'TOUROP' | 'TRANSPORTPIPELINE'
    | 'TRAVELAGENT' | 'ULIPMANAGEMENT' | 'UNDERWRITER' | 'VIDEOTAPEPROD' | 'WORKSCONTRACT';