export function getModelExtension(fileName: string) {
    const supportedFileExtensions = ["glb", "gltf", "obj", "babylon"]

    const extension = fileName.split(".")?.pop()?.toLocaleLowerCase();

    if (!extension) return

    if (supportedFileExtensions.includes(extension)) {
        return `.${extension}`
    }
}