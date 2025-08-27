import { commonSuccessToast } from '../../../services/functions/commonToast';
import { IconMailAi, IconMailFilled, IconPhoneFilled } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import Tree from 'react-d3-tree';
export interface Point {
    x: number;
    y: number;
}
const dimensions = {
    width: 500,
    height: 300,
};
const points: Point = {
    x: 330,
    y: 50,
};
const separation = {
    siblings: 5,
    nonSiblings: 5,
};

const xnodeSize = {
    x: 300,
    y: 150,
};

const DepotWiseTreeView = ({ depotWiseTreeView, onPersonSelect }: any) => {
    const [depotWiseTreeViewProps, setDepotWiseTreeViewProps] = useState<any>();
    const [componentHasData, setComponentHasData] = useState<boolean>(false);

    useEffect(() => {
        if (depotWiseTreeView) {
            setComponentHasData(true);
            setDepotWiseTreeViewProps(depotWiseTreeView);
        } else {
            setComponentHasData(false);
        }
    }, [depotWiseTreeViewProps, depotWiseTreeView]);

    useEffect(() => {}, []);

    function CopyEmail(text: string) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        commonSuccessToast('Email Copied!');
    }

    function CopyPhone(text: string) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        commonSuccessToast('Phone No. Copied!');
    }

    // const nodeSize = { x: 200, y: 220 };
    const foreignObjectProps = { width: 900, height: 230, x: 20 };

    const renderForeignObjectNode = ({ nodeDatum, toggleNode, foreignObjectProps }: any) => {
        let data = { ...foreignObjectProps, width: 900 };
        return (
            <g>
                <circle r={25}></circle>
                {/* `foreignObject` requires width & height to be explicitly set. */}
                <foreignObject {...data}>
                    <>
                        <div className="flex w-max items-start justify-center gap-2 shadow-[4px_6px_10px_-3px_#bfc9d4]">
                            {nodeDatum.attributes &&
                                nodeDatum.attributes &&
                                nodeDatum.attributes.length > 0 &&
                                nodeDatum.attributes.map((person: any) => {
                                    return person.person_name != '' ? (
                                        <>
                                            <div className="w-full">
                                                <div className="rounded rounded-b-[10px] bg-slate-100">
                                                    <div>
                                                        <p className="break-all px-2 pb-4 pt-2 text-lg font-bold text-blue-600">{person.person_name}</p>
                                                        <p className="mb-1 flex flex-wrap items-center justify-start break-all px-2 py-1 text-lg font-bold text-green-600">
                                                            <IconPhoneFilled className="h-[26px] w-[26px]" />
                                                            <span onClick={() => CopyPhone(person.person_mobile)}>&nbsp; {person.person_mobile}</span> &nbsp;&nbsp;
                                                            <span className="badge text-md rounded-full bg-success p-2 text-white" onClick={() => onPersonSelect(person)}>
                                                                Call
                                                            </span>
                                                        </p>
                                                        <p className="mb-1 flex justify-start break-all px-2 py-1 text-lg font-bold text-green-600" onClick={() => CopyEmail(person.person_email)}>
                                                            <IconMailFilled className=" h-[26px] w-[26px]" /> <span>&nbsp;&nbsp;{person.person_email}</span>
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="bg-green-600 px-2 py-2 text-xl font-medium text-white">{person.user_group}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>{nodeDatum.name && <div className="w-full break-all bg-primary-600 px-10 py-10 text-center text-4xl font-medium text-white">{nodeDatum.name}</div>}</>
                                    );
                                })}
                        </div>
                    </>
                </foreignObject>
            </g>
        );
    };
    // tree
    const tree = () => {
        return (
            <div id="treeWrapper" style={{ width: '83em', height: '30em', backgroundColor: '#a5c7fb' }}>
                <Tree
                    data={depotWiseTreeViewProps}
                    orientation="vertical"
                    collapsible={true}
                    dimensions={dimensions}
                    translate={points}
                    renderCustomNodeElement={(rd3tProps) => renderForeignObjectNode({ ...rd3tProps, foreignObjectProps })}
                    separation={separation}
                    depthFactor={700}
                    pathFunc={'step'}
                    zoom={-1}
                    zoomable={true}
                    // nodeSize={xnodeSize}
                />
            </div>
        );
    };
    // no record found
    const nrf = () => {
        // return <p className="align-center flex justify-center text-sm">Depot & Territory Hierarchy Not Found</p>;
        return null;
    };

    // return <h1>jkvgh</h1>;
    return (
        // `<Tree />` will fill width/height of its container; in this case `#treeWrapper`.
        // <div id="treeWrapper" style={{ width: '50em', height: '20em' }}>
        componentHasData ? tree() : nrf()
    );
};

export default DepotWiseTreeView;
