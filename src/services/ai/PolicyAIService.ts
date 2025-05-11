
import { VisionAlignmentService } from "./policy/VisionAlignmentService";
import { ImpactSimulationService } from "./policy/ImpactSimulationService";
import { BestPracticesService } from "./policy/BestPracticesService";

// Re-export types from the policy types file
export * from "./policy/types";

/**
 * Service for handling policy and strategy related AI operations
 * This service aggregates functionality from the specialized policy services
 */
export class PolicyAIService {
  // Vision 2030 alignment services
  static checkVision2030Alignment = VisionAlignmentService.checkVision2030Alignment;
  static analyzeVision2030Alignment = VisionAlignmentService.analyzeVision2030Alignment;

  // Impact simulation services
  static simulatePolicyImpact = ImpactSimulationService.simulatePolicyImpact;
  static simulateImpact = ImpactSimulationService.simulateImpact;

  // Best practices services
  static analyzePolicyAgainstBestPractices = BestPracticesService.analyzePolicyAgainstBestPractices;
}
