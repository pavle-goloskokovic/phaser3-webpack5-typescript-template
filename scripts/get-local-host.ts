import { networkInterfaces } from 'os';

const getLocalHost = (): string =>
{
    const nets = networkInterfaces();

    for (const netsKey in nets)
    {
        for (const net of nets[netsKey])
        {
            // skip over non-ipv4 and internal (i.e. 127.0.0.1) addresses
            if (net.family === 'IPv4' && !net.internal &&
                net.address.includes('192.168'))
            {
                return net.address;
            }
        }
    }

    return 'localhost';
};

const getPortHash = (str: string): number =>
{
    let hash = 0;
    if (str.length === 0) return hash;
    for (let i = 0; i < str.length; i++)
    {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash |= 0; // Convert to 32bit integer
    }
    return Number(Math.abs(hash).toString().slice(0, 4));
};

export { getLocalHost, getPortHash };
