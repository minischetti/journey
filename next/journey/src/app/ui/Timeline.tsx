import React from 'react';
import * as Types from '../types';

function Timeline({ items }: { items: Types.Item[] }) {
    // const lastItem = items[items.length - 1];
    // const restItems = items.slice(0, -1);

    function Orb({ children }: { children: JSX.Element }) {
        return <div className="grid justify-center items-center rounded-full aspect-square bg-zinc-600">{children}</div>;
    }
    function Line() {
        return <div className="grid justify-center items-center w-full h-0.5 bg-zinc-600"></div>;
    }

    return (
        <div className="grid grid-flow-col items-center gap-2">
            {items.map((item, itemIndex) => (
                <React.Fragment key={itemIndex}>
                    <Orb>
                        <p>{item.name}</p>
                    </Orb>
                    {itemIndex !== items.length - 1 && <Line />}
                </React.Fragment>
            ))}
        </div>
    );
}

export default Timeline;