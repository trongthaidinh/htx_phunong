import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './ServiceDetail.module.scss';
import LoadingScreen from '~/components/LoadingScreen';
import PushNotification from '~/components/PushNotification';
import DateTime from '~/components/DateTime';
import Title from '~/components/Title';
import { getServiceById } from '~/services/serviceService';
import { Helmet } from 'react-helmet';

const cx = classNames.bind(styles);

const ServiceDetail = () => {
    const { id } = useParams();
    const [serviceDetail, setServiceDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchServiceDetail = async () => {
            try {
                const data = await getServiceById(id);
                setServiceDetail(data);
            } catch (error) {
                setError(error);
                console.error('Error fetching service detail:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchServiceDetail();
    }, [id]);

    if (error) {
        const errorMessage = error.response ? error.response.data.message : 'Network Error';
        return <PushNotification message={errorMessage} />;
    }

    if (loading) {
        return <LoadingScreen isLoading={loading} />;
    }

    return (
        <article className={cx('wrapper')}>
            <Helmet>
                <title>{`${serviceDetail.title} | HTX Nông Nghiệp - Du Lịch Phú Nông Buôn Đôn`}</title>
                <meta name="description" content={serviceDetail.summary} />
                <meta name="keywords" content={`dịch vụ du lịch, ${serviceDetail.title}, phunongbuondon`} />
                <meta name="author" content="HTX Nông Nghiệp - Du Lịch Phú Nông Buôn" />
            </Helmet>
            <div className={cx('header')}>
                <Title text={`${serviceDetail.name}`} className={cx('title')} />
            </div>
            <div className={cx('content')} dangerouslySetInnerHTML={{ __html: serviceDetail.content }} />
            <DateTime timestamp={serviceDetail.created_at} showDate={true} showTime={true} showViews={false} />
        </article>
    );
};

export default ServiceDetail;
