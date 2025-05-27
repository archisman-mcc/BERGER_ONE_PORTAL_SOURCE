export module DepotTerrHiararchy {
    export interface I_Region {
        depot_regn: string;
        persons: I_Person[];
        depot: I_Depot[];
    }

    export interface I_Depot {
        depot_code: string;
        depot_name: string;
        persons: I_Person[];
        territories: Territory[];
    }

    export interface I_Person {
        person_name: string;
        person_mobile: string;
        person_email: string;
        person_designation: string;
        user_group: string;
    }

    export interface Territory {
        terr: string;
        persons: I_Person[];
    }
}

export module TreeViewStructure {
    // export interface Region {
    //     name: string;
    //     attributes: Attributes;
    //     children: Region[];
    // }

    export interface Data {
        name: string;
        attributes?: Attributes[];
        children?: Data[];
    }

    // export interface Depot {
    //     name: string;
    //     attributes: Attributes;
    //     children: Territory[];
    // }

    export interface Attributes {
        person_email: string;
        person_mobile: string;
        person_name: string;
        user_group: string;
    }

    // export interface Territory {
    //     name: string;
    //     attributes: Attributes;
    // }
}

export module TreeViewStructureNew {
    export interface FullData {
        depot_regn: string;
        persons: Person[];
        depot: Depot[];
    }

    export interface Depot {
        depot_code: string;
        depot_name: string;
        persons: Person[];
        territories: Territory[];
    }

    export interface Person {
        person_name: string;
        person_mobile: string;
        person_email: string;
        person_designation: string;
        user_group: string;
    }

    export interface Territory {
        terr: string;
        persons: Person[];
    }
}

export const testTreeData = {
    name: 'E1',
    attributes: [
        {
            person_name: '',
            person_mobile: '',
            person_email: '',
            person_designation: '',
            user_group: '',
        },
    ],
    children: [
        {
            name: '',
            attributes: [
                {
                    person_name: 'Tanoy Dhar',
                    person_mobile: '8527471432',
                    person_email: 'tanoydhar@bergerindia.com',
                    person_designation: 'RSM',
                    user_group: 'RSM',
                },
            ],
            children: [],
        },
        {
            name: '006:Calcutta-2',
            attributes: [],
            children: [
                {
                    name: '',
                    attributes: [
                        {
                            person_name: 'Sunil singh',
                            person_mobile: '9051842121',
                            person_email: 'sunilsingh1@bergerindia.com',
                            person_designation: 'ASM',
                            user_group: 'DEPOT',
                        },
                    ],
                },
                {
                    name: '',
                    attributes: [
                        {
                            person_name: 'ARUNANGSU BISWAS',
                            person_mobile: '9830635422',
                            person_email: 'arunangsubiswas@bergerindia.com',
                            person_designation: 'ASM',
                            user_group: 'DEPOT',
                        },
                    ],
                },
                {
                    name: '22',
                    attributes: [
                        {
                            person_name: '',
                            person_mobile: '',
                            person_email: '',
                            person_designation: '',
                            user_group: '',
                        },
                    ],
                    children: [
                        {
                            name: '24',
                            attributes: [
                                {
                                    person_name: 'SUMAN ADHIKARY',
                                    person_mobile: '7980218916',
                                    person_email: 'sumanadhiikary@gmail.com',
                                    person_designation: 'TSM',
                                    user_group: 'SO',
                                },
                            ],
                            children: [],
                        },
                    ],
                },
                {
                    name: '',
                    attributes: [
                        {
                            person_name: 'Sunil singh',
                            person_mobile: '9051842121',
                            person_email: 'sunilsingh1@bergerindia.com',
                            person_designation: 'ASM',
                            user_group: 'DEPOT',
                        },
                    ],
                },
                {
                    name: '',
                    attributes: [
                        {
                            person_name: 'ARUNANGSU BISWAS',
                            person_mobile: '9830635422',
                            person_email: 'arunangsubiswas@bergerindia.com',
                            person_designation: 'ASM',
                            user_group: 'DEPOT',
                        },
                    ],
                },
            ],
        },
        {
            name: '',
            attributes: [
                {
                    person_name: 'Swarna Sourish Banerjee',
                    person_mobile: '7596061590',
                    person_email: 'swarnabanerjee@bergerindia.com',
                    person_designation: 'RSM',
                    user_group: 'RSM',
                },
            ],
            children: [],
        },
    ],
};
