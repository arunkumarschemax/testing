class RelicJobsParams {
    name: string;
    group: string;
    newrelic: any
}
export function JobInstrument(params: RelicJobsParams) {
    return function addBackgroundJob(target: Object, property: string, descriptor: PropertyDescriptor) {
        try {
            const { newrelic } = params;
            const original = descriptor.value;
            if (typeof original === 'function') {
                descriptor.value = async function (...args) {
                    await newrelic.startBackgroundTransaction(params.name, params.group, async () => {
                        const transaction = newrelic.getTransaction();
                        try {
                            newrelic.addCustomAttribute("jobId", args[0].id);
                            newrelic.addCustomAttribute("JOB_QUEUE_NAME ", params.name);
                            const result = await original.apply(this, args);
                            transaction.end();
                            return result;
                        } catch (error) {
                            newrelic.addCustomAttribute("error", 'yes');
                            newrelic.noticeError(error);
                            transaction.end();
                            throw error;
                        }
                    });
                }
            }
        } catch (error) {
            throw error;
        }
        return descriptor;
    }
}