import dcImplementation from '@/src/data/store-implementation/dc-store-implementation';
import { pbdcStoreImplementation } from '@/src/data/store-implementation/pbdc-store-implementation';

const PbdcDetailViewModel = () => {
    const pbdcStore = pbdcStoreImplementation();
    const dcStore = dcImplementation();
    return{
        data: pbdcStore?.detailPbdc,
        overview: pbdcStore?.overviewPbdc,
        dc: dcStore?.dc
    };
};

export default PbdcDetailViewModel;
