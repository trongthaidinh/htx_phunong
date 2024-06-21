import classNames from 'classnames/bind';
import Header from '../components/Header';
import styles from './OnlyHeaderLayout.module.scss';

const cx = classNames.bind(styles);

function OnlyHeaderLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

export default OnlyHeaderLayout;
