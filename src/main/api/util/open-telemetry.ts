import { ConsoleSpanExporter, SimpleSpanProcessor, BatchSpanProcessor } from '@opentelemetry/sdk-trace-base'
import { NodeSDK } from '@opentelemetry/sdk-node'
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http'
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express'
import { WinstonInstrumentation } from '@opentelemetry/instrumentation-winston'
import { Resource } from '@opentelemetry/resources'
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions'
import { randomUUID } from 'crypto'

const traceExporter = new ConsoleSpanExporter()
const resource = new Resource({
  [SemanticResourceAttributes.SERVICE_NAME]: 'api-uhuu',
  [SemanticResourceAttributes.SERVICE_INSTANCE_ID]: randomUUID(),
})

const spanProcessor =
  process.env.NODE_ENV === 'production' ? new BatchSpanProcessor(traceExporter) : new SimpleSpanProcessor(traceExporter)

export const otelSDK = new NodeSDK({
  resource,
  spanProcessor,
  instrumentations: [new HttpInstrumentation(), new ExpressInstrumentation(), new WinstonInstrumentation()],
})
