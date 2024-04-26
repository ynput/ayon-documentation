import { DocType } from "../addons/types";

export type Feature = {
    title: string;
    description: string;
    preview?: string;
    docs?: { [type in DocType]?: String };
    github?: string;
    id?: string;
};

export type FeatureType =
    | "workfiles"
    | "loader"
    | "publisher"
    | "sceneManager"
    | "libraryLoader"
    | "reviewables"
    | "slates"
    | "colorManaged"
    | "farmRendering"
    | "localRendering"
    | "appLauncher"
    | "trayPublisher"
    | "projectManager"
    | "configurationGUI"
    | "siteSync"
    | "remoteWorkflow"
    | "timersManager"
    | "sceneBuilder"
    | "nodePresets"
    | "burnins"
    | "bakingColorspacePresets"
    | "scriptBuilding"
    | "sgSync";
