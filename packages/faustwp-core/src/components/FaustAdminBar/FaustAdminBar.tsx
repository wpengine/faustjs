import React from 'react';
import styles from './FaustAdminBar.module.scss';

export function FaustAdminBar(props: any) {
    console.log(props);

    return (
        <div className={styles.component}>
            <div>Faust Admin Bar</div>
        </div>
    );
}
