// The engine's connector line is the authoritative signal that standard integration was priced.
export function integrationCopyState(result) {
 const hasConnector = result.lines.some(line => line.id === 'connector' && (line.setup !== 0 || line.monthly !== 0));
 return { hasConnector, unknown: result.unknown.map(reason => reason === 'crossDomainIntegration' && hasConnector ? 'otherCrossDomainIntegration' : reason) };
}
