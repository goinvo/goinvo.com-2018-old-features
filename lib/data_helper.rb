require 'date'

module DataHelper
  def get_project_by_id(id)
    data.projects.detect { |c| c.uid == id }
  end

  def get_projects_by_id(project_ids_to_find)
    [*project_ids_to_find].collect { |id| data.projects.detect { |project| project.uid == id } }
  end

  def get_partners_by_type(type)
    data.projects.select { |project| project.type == type && project.client_url && project.partner_logo }.sort_by { |project| project.partner_logo }
  end

  def get_open_source_projects()
    data.projects.select { |project| project.project_name && project.open_source_description }
  end

  def page_for_meta(page)
    match = data.meta_tags.detect { |p| p.page == page }
    puts "didn't find a match for name: #{page}" if match.nil?

    match
  end

  def practice_areas(project)
    project.practice_area_names.split(',').map(&:strip)
  end

  # Feature articles yaml helpers
  def feature_articles_sorted_by_date()
    data.feature_articles.articles.sort { |a,b| a.date <=> b.date }.reverse
  end

  def get_feature_article_by_id(id)
    data.feature_articles.articles.detect { |c| c.id == id }
  end

  def feature_article_date(article)
    Date.parse(article.date).strftime("%B %Y")
  end
end
