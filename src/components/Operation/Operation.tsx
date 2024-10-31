import { observer } from 'mobx-react';
import * as React from 'react';

import { DarkRightPanel, H2, MiddlePanel, Row } from '../../common-elements';
import { OperationModel } from '../../services/models';
import styled from '../../styled-components';
import { CallbacksList } from '../Callbacks';
import { CallbackSamples } from '../CallbackSamples/CallbackSamples';
import { Endpoint } from '../Endpoint/Endpoint';
import { ExternalDocumentation } from '../ExternalDocumentation/ExternalDocumentation';
import { Extensions } from '../Fields/Extensions';
import { Markdown } from '../Markdown/Markdown';
import { OptionsContext } from '../OptionsProvider';
import { Parameters } from '../Parameters/Parameters';
import { RequestSamples } from '../RequestSamples/RequestSamples';
import { ResponsesList } from '../Responses/ResponsesList';
import { ResponseSamples } from '../ResponseSamples/ResponseSamples';
import { SecurityRequirements } from '../SecurityRequirement/SecurityRequirement';
import { SECTION_ATTR } from '../../services';
import { GlobeIconComponent, BaseUrlComponent } from '../../common-elements/linkify';

const Description = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.unit * 6}px;
`;

export interface OperationProps {
  operation: OperationModel;
}

export const Operation = observer(({ operation }: OperationProps): JSX.Element => {
  const { name: summary, description, externalDocs, isWebhook, baseUrl } = operation;
  const hasDescription = !!(description || externalDocs);

  return (
    <OptionsContext.Consumer>
      {options => (
        <Row {...{ [SECTION_ATTR]: operation.operationHash }} id={operation.operationHash}>
          <MiddlePanel>
            <H2>
              {/* UAPI-REDOC_007 */}
              {/* <ShareLink to={operation.id} /> */}
              <GlobeIconComponent text={summary} />
            </H2>
            <BaseUrlComponent baseUrl={baseUrl} />
            {hasDescription && (
              <Description>
                {description !== undefined && <Markdown source={description} />}
                {externalDocs && <ExternalDocumentation externalDocs={externalDocs} />}
              </Description>
            )}
            <Extensions extensions={operation.extensions} />
            <SecurityRequirements securities={operation.security} />
            <Parameters parameters={operation.parameters} body={operation.requestBody} />
            <ResponsesList responses={operation.responses} />
            <CallbacksList callbacks={operation.callbacks} />
          </MiddlePanel>
          {/* UAPI-REDOC_006 */}
          <DarkRightPanel>
            {!options.pathInMiddlePanel && !isWebhook && <Endpoint operation={operation} />}
            <RequestSamples operation={operation} />
            <ResponseSamples operation={operation} />
            <CallbackSamples callbacks={operation.callbacks} />
          </DarkRightPanel>
        </Row>
      )}
    </OptionsContext.Consumer>
  );
});
