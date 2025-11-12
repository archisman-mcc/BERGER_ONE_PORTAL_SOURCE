import { Button, Group } from '@mantine/core';
import { MantineReactTable, type MRT_ColumnDef } from 'mantine-react-table'
import React, { useEffect } from 'react'
import AsyncSelectBox from '../../Transact/Components/AsyncSelectBox';
import { GetStakeHolderList } from '../../../../services/api/protectonLead/PotentialLead';

const TeamMemberTable = ({ data, setData }: any) => {
    // const [contacts, setContacts] = React.useState<any[]>(data?.potentialTrackingcontacts.filter((ptc: any) => ptc?.ptc_contact_type === "STACKHOLDER") || []);
    const [existingBusinessContract, setexistingBusinessContract]: any = React.useState(null);

    useEffect(() => {
        // console.log(existingBusinessContract, data?.potentialTrackingcontacts)
        if (existingBusinessContract) {
            const existData = data?.potentialTrackingcontacts.filter((ptc: any) => ptc?.ptc_contact_type === "STACKHOLDER" && ptc?.ptc_name === existingBusinessContract?.selectedObj[0].stakeholder_name) || [];
            // console.log(existData);
            if (existData.length > 0) {
                alert("Stakeholder already exist!")
                return;
            }
            const row = {
                ptc_company_name: existingBusinessContract?.selectedObj[0].stakeholder_id,
                ptc_name: existingBusinessContract?.selectedObj[0].stakeholder_name,
                ptc_designation: existingBusinessContract?.selectedObj[0].stakeholder_desig,
                ptc_phone_no: existingBusinessContract?.selectedObj[0].stakeholder_mobile,
                ptc_email: existingBusinessContract?.selectedObj[0].stakeholder_mailid,
                ptc_city: '',
                ptc_contact_type: 'STACKHOLDER'
            };
            // setContacts((pre: any) => [...pre, row]);
            setData((pre: any) => ({ ...pre, potentialTrackingcontacts: [...data?.potentialTrackingcontacts, row] }));
            setexistingBusinessContract(null);
        }
    }, [existingBusinessContract])

    const handleDelete = (row: any) => {
        // console.log(row, data?.potentialTrackingcontacts);
        const updated = data.potentialTrackingcontacts.filter((ptc: any) => ptc?.ptc_company_name !== row?.ptc_company_name);
        setData((prev: any) => ({ ...prev, potentialTrackingcontacts: updated }));
    }

    const columns = React.useMemo<MRT_ColumnDef<any>[]>(
        () => [
            {
                accessorKey: 'ptc_company_name',
                header: 'Company Name'
            },
            {
                accessorKey: 'ptc_name',
                header: 'Name'
            },
            {
                accessorKey: 'ptc_designation',
                header: 'Designation'
            },
            {
                accessorKey: 'ptc_phone_no',
                header: 'Phone Number'
            },
            {
                accessorKey: 'ptc_email',
                header: 'Email Address'
            },
            {
                header: 'Actions',
                Cell: ({ row }) =>
                    <Group spacing="xs">
                        <Button size="xs" color="red" onClick={() => handleDelete(row?.original)}>Delete</Button>
                    </Group>
            },
        ],
        [data?.potentialTrackingcontacts]
    );

    return (
        <>
            <div className='mb-2 p-pl-table-item'>
                {/* <label className="block text-sm font-semibold mb-1">Team Memeber Search:</label> */}
                <AsyncSelectBox
                    data={existingBusinessContract}
                    setData={setexistingBusinessContract}
                    label="display_name"
                    value="stakeholder_id"
                    api={GetStakeHolderList}
                    payloadPrefixText='srarchstr'
                    // placeholder="Search for existing business contract..."
                    apiPayload={{}}
                />
            </div>
            <div>Team Members :</div>
            <MantineReactTable
                columns={columns}
                // data={contacts}
                data={data?.potentialTrackingcontacts.filter((ptc: any) => ptc?.ptc_contact_type === "STACKHOLDER") || []}
                enableStickyHeader={true}
                enablePagination={false}
                enableColumnActions={false}
                enableSorting={false}
                enableTopToolbar={false}
                mantineTableContainerProps={{ style: { maxHeight: '50vh', overflowY: 'auto' } }}
                mantineTableHeadCellProps={{
                    style: {
                        fontSize: '50px',
                        fontWeight: '600',
                        color: '#374151'
                    }
                }}
            />
        </>
    )
}

export default TeamMemberTable