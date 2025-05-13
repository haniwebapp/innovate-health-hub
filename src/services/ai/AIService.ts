
import { AIServiceType } from "./AIServiceRegistry";
import { AIServiceStaticReferences, CallTrace } from "./types/AIServiceTypes";

export abstract class AIService {
  abstract serviceType: AIServiceType;
  
  constructor() {}
  
  abstract isAvailable(): Promise<boolean>;
  
  abstract getStaticReferences(): AIServiceStaticReferences;
  
  abstract recordCall(trace: CallTrace): Promise<void>;
}
