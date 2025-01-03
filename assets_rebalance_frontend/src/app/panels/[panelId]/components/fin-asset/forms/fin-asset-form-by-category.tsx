import { FinAssetCategory } from '@/lib/domain/enums/fin-asset-category.enum'
import React from 'react'
import FinAssetFixedForm from './fin-asset-fixed-form'
import FinAssetForm, { FinAssetFormProps } from './fin-asset-form'


const getFinAssetFormByCategory: Record<FinAssetCategory, (props: FinAssetFormProps) => React.ReactNode> = {
  [FinAssetCategory.Fixed]: (props) => <FinAssetFixedForm {...props} />,
  [FinAssetCategory.Variable]: (props) => <FinAssetForm {...props} />,
  [FinAssetCategory.Cripto]: (props) => <FinAssetForm {...props} />,
  [FinAssetCategory.Currency]: (props) => <FinAssetForm {...props} />,
  [FinAssetCategory.ExternalFixed]: (props) => <FinAssetForm {...props} />,
  [FinAssetCategory.ExternalVariable]: (props) => <FinAssetForm {...props} />,
}

export default function FinAssetFormByCategory(props: FinAssetFormProps) {
  return getFinAssetFormByCategory[props.asset.category](props)
}
