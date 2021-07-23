import MyAlgo, { Accounts } from '@randlabs/myalgo-connect';
import React, { FC, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Button, Col, Container, Row } from 'reactstrap';
import PrismCode from '../commons/Code';
import "./homepage.scss";

interface ConnectProps {
    connection: MyAlgo;
    onComplete(accounts: Accounts[]): void;
}

const installCode = `npm install @randlabs/myalgo-connect`;

const code = `
import MyAlgoConnect from '@randlabs/myalgo-connect';
 
const myAlgoConnect = new MyAlgoConnect();

const accountsSharedByUser = await myAlgoConnect.connect();
`;

const Connect: FC<ConnectProps> = (props: ConnectProps): JSX.Element => {

    const [accounts, setAccounts] = useState<Accounts[]>([]);
    const { ref, inView, entry } = useInView({ threshold: 0.5 });

    const connectToMyAlgo = async (): Promise<void> => {
        try {
            const { connection, onComplete } = props;

            const accounts = await connection.connect();

            setAccounts(accounts);
            onComplete(accounts);
        }
        catch (err) {
            console.error(err);
        }
    }

    return (
        <div ref={ref} className={`custom-container from-small ${inView ? "appear" : ""}`}>
            <div className="function">
                <h1 className="title">
                    Know your user
                    </h1>
                <h2 className="subtitle">
                    Connect your dApp(s) with
                    the user’s wallet(s).
                    </h2>
                <div className="button button-blue scale-on-hover" onClick={connectToMyAlgo}>
                    Connect
                </div>
            </div>
            <div ref={ref} className={`code-max-width from-right ${inView ? "appear" : ""}`}>
                <div className="mb-3 install-code">
                    <PrismCode
                        code={installCode}
                        language="js"
                    />
                </div>

                <PrismCode
                    code={code}
                    language="js"
                />
            </div>
        </div>
    );
}

export default Connect;
