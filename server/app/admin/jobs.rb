ActiveAdmin.register Job do
  # Specify parameters which should be permitted for assignment
  permit_params :name, :title, :shortDescription, :longDescription, :logo, :status

  # or consider:
  #
  # permit_params do
  #   permitted = [:name, :title, :shortDescription, :longDescription, :logo, :status]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end

  # For security, limit the actions that should be available
  actions :all, except: []

  # Add or remove filters to toggle their visibility
  filter :id
  filter :name
  filter :title
  filter :shortDescription
  filter :longDescription
  filter :logo
  filter :status
  filter :created_at
  filter :updated_at

  # Add or remove columns to toggle their visiblity in the index action
  index do
    selectable_column
    id_column
    column :name
    column :title
    column :shortDescription
    column :longDescription
    column :logo
    column :status
    column :created_at
    column :updated_at
    actions
  end

  # Add or remove rows to toggle their visiblity in the show action
  show do
    attributes_table_for(resource) do
      row :id
      row :name
      row :title
      row :shortDescription
      row :longDescription
      row :logo
      row :status
      row :created_at
      row :updated_at
    end
  end

  # Add or remove fields to toggle their visibility in the form
  form do |f|
    f.semantic_errors(*f.object.errors.attribute_names)
    f.inputs do
      f.input :name
      f.input :title
      f.input :shortDescription
      f.input :longDescription
      f.input :logo
      f.input :status
    end
    f.actions
  end
end
