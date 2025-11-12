import { MantineReactTable, useMantineReactTable, type MRT_ColumnDef } from 'mantine-react-table';
import { Button, TextInput, Group } from '@mantine/core';
import React from 'react';

const emptyRow = { c_city: '', c_name: '', c_designation: '', c_mobile_no: '', c_email: '' };

const SiteContactTable = ({ data, setData }: any) => {
    const [contacts, setContacts] = React.useState<any[]>(data?.siteContactTableData || []);
    const [editingRow, setEditingRow] = React.useState<number | null>(null);
    const [isAdding, setIsAdding] = React.useState(false);

    React.useEffect(() => {
        setContacts(data?.siteContactTableData || []);
    }, [data?.siteContactTableData]);

    // React.useEffect(() => {
    //     console.log(contacts);
    // }, [contacts]);

    const handleEditField = (rowIdx: number, field: string, value: string) => {
        setContacts(prev => prev.map((row, idx) => idx === rowIdx ? { ...row, [field]: value } : row));
    };

    const handleSave = (rowIdx: number) => {
        if (contacts[rowIdx].c_name.trim() === '') {
            alert('Please enter user name');
            return;
        } else if (contacts[rowIdx].c_mobile_no.trim() === '' && contacts[rowIdx].c_email.trim() === '') {
            alert('Please enter either phone number or email address');
            return;
        }
        else {
            if (contacts[rowIdx].c_mobile_no) {
                if (contacts[rowIdx].c_mobile_no.length < 10) {
                    alert('Please enter a valid phone number');
                    return;
                }
            } else if (contacts[rowIdx].c_email) {
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contacts[rowIdx].c_email)) {
                    alert('Please enter a valid email address');
                    return;
                }
            }
        }

        if (data && Array.isArray(data.siteContactTableData)) {
            data.siteContactTableData[rowIdx] = { ...contacts[rowIdx] };
            setData((prev: any) => ({ ...prev, siteContactTableData: [...data.siteContactTableData] }));
        }
        setEditingRow(null);
        setIsAdding(false);
    };

    const handleDelete = (rowIdx: number) => {
        setContacts(prev => prev.filter((_, idx) => idx !== rowIdx));
        if (data && Array.isArray(data.siteContactTableData)) {
            const updated = data.siteContactTableData.filter((_: any, idx: number) => idx !== rowIdx);
            setData((prev: any) => ({ ...prev, siteContactTableData: updated }));
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
                accessorKey: 'c_city',
                header: 'City',
                Cell: ({ cell, row }) =>
                    editingRow === row.index ? (
                        <TextInput
                            value={contacts[row.index].c_city}
                            onChange={e => handleEditField(row.index, 'c_city', e.target.value)}
                            size="xs"
                        />
                    ) : (
                        cell.getValue() || ''
                    ),
            },
            {
                accessorKey: 'c_name',
                header: 'Name',
                Cell: ({ cell, row }) =>
                    editingRow === row.index ? (
                        <TextInput
                            value={contacts[row.index].c_name}
                            onChange={e => handleEditField(row.index, 'c_name', e.target.value)}
                            size="xs"
                        />
                    ) : (
                        cell.getValue() || ''
                    ),
            },
            {
                accessorKey: 'c_designation',
                header: 'Designation',
                Cell: ({ cell, row }) =>
                    editingRow === row.index ? (
                        <TextInput
                            value={contacts[row.index].c_designation}
                            onChange={e => handleEditField(row.index, 'c_designation', e.target.value)}
                            size="xs"
                        />
                    ) : (
                        cell.getValue() || ''
                    ),
            },
            {
                accessorKey: 'c_mobile_no',
                header: 'Phone Number',
                Cell: ({ cell, row }) =>
                    editingRow === row.index ? (
                        <TextInput
                            value={contacts[row.index].c_mobile_no}
                            onChange={(event: any) => {
                                const value = event.target.value;
                                if (value.length <= 10 && /^[0-9]*$/.test(value)) {
                                    handleEditField(row.index, 'c_mobile_no', value)
                                }
                            }}
                            size="xs"
                        />
                    ) : (
                        cell.getValue() || ''
                    ),
            },
            {
                accessorKey: 'c_email',
                header: 'Email Address',
                Cell: ({ cell, row }) =>
                    editingRow === row.index ? (
                        <TextInput
                            value={contacts[row.index].c_email}
                            onChange={e => handleEditField(row.index, 'c_email', e.target.value)}
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
        <div className='p-pl-table-item'>
            <MantineReactTable
                columns={columns}
                data={contacts}
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
        </div>
    );
};

export default SiteContactTable