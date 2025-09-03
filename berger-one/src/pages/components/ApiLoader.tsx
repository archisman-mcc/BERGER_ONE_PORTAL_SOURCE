import IconLoader from '../../components/Icon/IconLoader';
import React from 'react';

const ApiLoader: React.FC = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {/* <span className="inline-block h-14 w-14 animate-spin rounded-full border-8 border-[#f1f2f3] border-l-[#3b82f6] align-middle"></span> */}
            <IconLoader className="h-12 w-12 shrink-0 animate-[spin_2s_linear_infinite]" />
        </div>
    );
};

export default ApiLoader;