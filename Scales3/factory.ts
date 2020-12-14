export default function uniFactory<T>(classRef: { new (): T; }): T {
    return new classRef();
}