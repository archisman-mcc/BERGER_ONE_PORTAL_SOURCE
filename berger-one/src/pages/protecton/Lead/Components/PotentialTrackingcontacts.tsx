import { MantineReactTable, useMantineReactTable, type MRT_ColumnDef } from 'mantine-react-table';
import { Button, TextInput, Group } from '@mantine/core';
import React from 'react';

const PotentialTrackingcontacts = ({ data, setData, type }: any) => {
    const [contacts, setContacts] = React.useState<any[]>(data?.potentialTrackingcontacts || []);
    const [editingRow, setEditingRow]: any = React.useState<number | null>(null);
    const [isAdding, setIsAdding] = React.useState(false);

    const emptyRow = { ptc_company_name: '', ptc_name: '', ptc_designation: '', ptc_phone_no: '', ptc_email: '', ptc_city: '', ptc_contact_type: '' };
    // { c_city: '', c_name: '', c_designation: '', c_mobile_no: '', c_email: '' };


    React.useEffect(() => {
        type === "ReferralSourceDetails" && setContacts(data?.potentialTrackingcontacts.filter((ptc: any) => ptc?.ptc_contact_type === "CONTRACTOR") || []);
        type === "ProjectContactPersons" && setContacts(data?.potentialTrackingcontacts.filter((ptc: any) => ptc?.ptc_contact_type === "Site Contact") || []);
        type === "Consultant/Architect" && setContacts(data?.potentialTrackingcontacts.filter((ptc: any) => ptc?.ptc_contact_type === "CONSULTANT") || []);
        type === "EngineeringContractor" && setContacts(data?.potentialTrackingcontacts.filter((ptc: any) => ptc?.ptc_contact_type === "ENGINEER") || []);
    }, [data?.potentialTrackingcontacts]);
    // React.useEffect(() => {
    //     console.log(contacts)
    // }, [contacts]);

    const handleEditField = (rowIdx: number, field: string, value: string) => {
        setContacts(prev => prev.map((row, idx) => idx === rowIdx ? { ...row, [field]: value } : row));
    };

    const handleSave = (rowIdx: number) => {
        if (contacts[rowIdx].ptc_name.trim() === '') {
            alert('Please enter user name');
            return;
        } else if (contacts[rowIdx].ptc_phone_no.trim() === '' && contacts[rowIdx].ptc_email.trim() === '') {
            alert('Please enter either phone number or email address');
            return;
        }
        else {
            if (contacts[rowIdx].ptc_phone_no) {
                if (contacts[rowIdx].ptc_phone_no.length < 10) {
                    alert('Please enter a valid phone number');
                    return;
                }
            }
            if (contacts[rowIdx].ptc_email) {
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contacts[rowIdx].ptc_email)) {
                    alert('Please enter a valid email address');
                    return;
                }
            }
        }

        if (data && Array.isArray(data.potentialTrackingcontacts)) {
            // console.log(contacts)
            // console.log(editingRow)
            // console.log(contacts[editingRow])
            if (isAdding) {
                console.log(type)
                setData((prev: any) => ({ ...prev, potentialTrackingcontacts: [...data.potentialTrackingcontacts, { ...contacts[rowIdx], ptc_contact_type: type === "ReferralSourceDetails" ? "CONTRACTOR" : type === "ProjectContactPersons" ? "Site Contact" : type === "Consultant/Architect" ? "CONSULTANT" : type === "EngineeringContractor" ? "ENGINEER" : "" }] }));
            }
            else {
                const updated = data?.potentialTrackingcontacts.filter((ptc: any) => ptc?.ptc_contact_type !== contacts[editingRow]?.ptc_contact_type);
                setData((prev: any) => ({ ...prev, potentialTrackingcontacts: [...updated, ...contacts] }));
            }
        }
        setEditingRow(null);
        setIsAdding(false);
    };

    const handleDelete = (rowIdx: number) => {
        setContacts(prev => prev.filter((_, idx) => idx !== rowIdx));
        if (data && Array.isArray(data.potentialTrackingcontacts)) {
            const updated = data.potentialTrackingcontacts.filter((_: any, idx: number) => idx !== rowIdx);
            setData((prev: any) => ({ ...prev, potentialTrackingcontacts: updated }));
        }
        setEditingRow(null);
        setIsAdding(false);
    };

    const handleAdd = () => {
        setContacts(prev => [...prev, { ...emptyRow }]);
        setEditingRow(contacts.length); // new row index
        setIsAdding(true);
    };

    const handleCancelAdd = (rowIdx: number) => {
        setContacts(prev => prev.filter((_, idx) => idx !== rowIdx));
        setEditingRow(null);
        setIsAdding(false);
    };

    const columns = React.useMemo<MRT_ColumnDef<any>[]>(
        () => [
            {
                accessorKey: 'ptc_company_name',
                header: 'Company Name',
                Cell: ({ cell, row }) =>
                    editingRow === row.index ? (
                        <TextInput
                            value={contacts[row.index].ptc_company_name}
                            onChange={e => handleEditField(row.index, 'ptc_company_name', e.target.value)}
                            size="xs"
                        />
                    ) : (
                        cell.getValue() || ''
                    ),
            },
            {
                accessorKey: 'ptc_name',
                header: 'Name',
                Cell: ({ cell, row }) =>
                    editingRow === row.index ? (
                        <TextInput
                            value={contacts[row.index].ptc_name}
                            onChange={e => handleEditField(row.index, 'ptc_name', e.target.value)}
                            size="xs"
                        />
                    ) : (
                        cell.getValue() || ''
                    ),
            },
            {
                accessorKey: 'ptc_designation',
                header: 'Designation',
                Cell: ({ cell, row }) =>
                    editingRow === row.index ? (
                        <TextInput
                            value={contacts[row.index].ptc_designation}
                            onChange={e => handleEditField(row.index, 'ptc_designation', e.target.value)}
                            size="xs"
                        />
                    ) : (
                        cell.getValue() || ''
                    ),
            },
            {
                accessorKey: 'ptc_phone_no',
                header: 'Phone Number',
                Cell: ({ cell, row }) =>
                    editingRow === row.index ? (
                        <TextInput
                            value={contacts[row.index].ptc_phone_no}
                            onChange={(event: any) => {
                                const value = event.target.value;
                                if (value.length <= 10 && /^[0-9]*$/.test(value)) {
                                    handleEditField(row.index, 'ptc_phone_no', value)
                                }
                            }}
                            size="xs"
                        />
                    ) : (
                        cell.getValue() || ''
                    ),
            },
            {
                accessorKey: 'ptc_email',
                header: 'Email Address',
                Cell: ({ cell, row }) =>
                    editingRow === row.index ? (
                        <TextInput
                            value={contacts[row.index].ptc_email}
                            onChange={e => handleEditField(row.index, 'ptc_email', e.target.value)}
                            size="xs"
                        />
                    ) : (
                        cell.getValue() || ''
                    ),
            },
            {
                header: 'Actions',
                Header: () => (
                    <Button size="xs" color="blue" onClick={handleAdd} disabled={editingRow !== null}>
                        Add
                    </Button>
                ),
                Cell: ({ row }) =>
                    editingRow === row.index ? (
                        <Group spacing="xs">
                            <Button size="xs" color="green" onClick={() => handleSave(row.index)}>Save</Button>
                            <Button size="xs" color="red" onClick={() => isAdding ? handleCancelAdd(row.index) : setEditingRow(null)}>Cancel</Button>
                        </Group>
                    ) : (
                        <Group spacing="xs">
                            <Button size="xs" onClick={() => setEditingRow(row.index)} disabled={editingRow !== null}>Edit</Button>
                            <Button size="xs" color="red" onClick={() => handleDelete(row.index)} disabled={editingRow !== null}>Delete</Button>
                        </Group>
                    ),
            },
        ],
        [contacts, editingRow, isAdding]
    );

    return (
        <div>
            <MantineReactTable
                columns={columns}
                data={contacts}
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
        </div>
    )
}

export default PotentialTrackingcontacts