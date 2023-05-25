import dcImplementation from '@/src/data/store-implementation/dc-store-implementation';
import { pbdcStoreImplementation } from '@/src/data/store-implementation/pbdc-store-implementation';
import { DcStore } from '@/src/domain/store/dc-store';

const PbdcDetailViewModel = () => {
    const pbdcStore = pbdcStoreImplementation();
    const dcStore = dcImplementation();
    return{
        dataPbdc: pbdcStore?.detailPbdc,
        overview: pbdcStore?.overviewPbdc,
        dataDc: dcStore?.dc && dcStore?.dc.filter(
            ({ fmkcab }:any) => fmkcab === pbdcStore?.detailPbdc.dc
        )[0],
    };
};

export default PbdcDetailViewModel;
