import { useState, useEffect } from "react";
import { Addon, AddonType } from "../data";

const useAddonsLoader = (addonIds: AddonType[]) => {
    const [loadedFiles, setLoadedFiles] = useState<Addon[]>([]);

    useEffect(() => {
        const fetchImage = async (file: string) => {
            try {
                // check for file
                const response = await fetch(file);
                if (response.ok) {
                    const blob = await response.blob();
                    const url = URL.createObjectURL(blob);
                    return url;
                }
            } catch (error) {
                console.error(error);
            }
        };

        const fetchData = async () => {
            const loadedFilesData: Addon[] = [];

            for (const addonId of addonIds) {
                try {
                    // Check for .ts file
                    const tsResponse = await fetch(`./addons/${addonId}.ts`);
                    if (tsResponse.ok) {
                        const tsModule = await import(`./addons/${addonId}.ts`);
                        loadedFilesData.push(tsModule.default);
                        continue;
                    }

                    // Check for .js file
                    const jsResponse = await fetch(`./addons/${addonId}.js`);
                    if (jsResponse.ok) {
                        const jsModule = await import(`./addons/${addonId}.js`);
                        loadedFilesData.push(jsModule.default);
                        continue;
                    }

                    // Check for .json file
                    const jsonResponse = await fetch(
                        `./addons/${addonId}.json`
                    );
                    if (jsonResponse.ok) {
                        const jsonData = await jsonResponse.json();
                        console.log(`json file found for addonId: ${addonId}`);
                        loadedFilesData.push(jsonData);
                    } else {
                        console.log(`no file found for addonId: ${addonId}`);
                    }
                } catch (error) {
                    console.error(error);
                }
            }

            setLoadedFiles(loadedFilesData);
        };

        fetchData();
    }, [addonIds]);

    return loadedFiles;
};

export default useAddonsLoader;
