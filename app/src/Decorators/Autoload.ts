export default function Autoload(_:any, _2:any, property: TypedPropertyDescriptor<any>) {
    const orginalMethod = property.value;
    const adjDescriptor : TypedPropertyDescriptor<any> = {
        configurable: true,
        enumerable: false,
        get () {
            return orginalMethod.bind(this);
        }
    };

    return adjDescriptor;
}
