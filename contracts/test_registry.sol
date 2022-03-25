pragma solidity ^0.5.12;

contract registry {
    mapping(bytes32 => address[]) public registryMap;

    struct ReverseRegistryData {
        bytes32 name;
        uint256 version;
    }
    mapping(address => ReverseRegistryData) public reverseRegistry;

    event AddRegistry(
        bytes32 indexed name,
        address registryAddress,
        uint256 version
    );

    function addRegistry(bytes32 registryName, address registryAddress)
        external
    {
        address[] storage registry = registryMap[registryName];
        uint256 version = registry.length;
        registry.push(registryAddress);

        reverseRegistry[registryAddress] = ReverseRegistryData(
            registryName,
            version
        );
        emit AddRegistry(registryName, registryAddress, version);
    }

    function resolveNameToLatestAddress(bytes32 name)
        external
        view
        returns (address)
    {
        address[] storage registry = registryMap[name];
        uint256 length = registry.length;
        require(length > 0, "MR: no match found for name");
        return registry[length - 1];
    }

    function resolveNameAndVersionToAddress(bytes32 name, uint256 version)
        external
        view
        returns (address)
    {
        address[] storage registry = registryMap[name];
        require(
            version < registry.length,
            "MR: no match found for name and version"
        );
        return registry[version];
    }

    function resolveNameToAllAddresses(bytes32 name)
        external
        view
        returns (address[] memory)
    {
        address[] storage registry = registryMap[name];
        require(registry.length > 0, "MR: no match found for name");
        return registry;
    }

    function resolveAddressToRegistryData(address registryAddress)
        external
        view
        returns (
            bytes32 name,
            uint256 version,
            bool isLatest
        )
    {
        ReverseRegistryData memory data = reverseRegistry[registryAddress];
        require(data.name != 0, "MR: no match found for address");
        name = data.name;
        version = data.version;
        uint256 length = registryMap[name].length;
        require(length > 0, "MR: no version found for address");
        isLatest = version == length - 1;
    }
}
